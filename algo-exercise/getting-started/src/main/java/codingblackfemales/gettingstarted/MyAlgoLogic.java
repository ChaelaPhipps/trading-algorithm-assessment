package codingblackfemales.gettingstarted;

import codingblackfemales.action.Action;
import codingblackfemales.action.NoAction;
import codingblackfemales.algo.AlgoLogic;
import codingblackfemales.sotw.SimpleAlgoState;
import codingblackfemales.action.OrderSide;
import codingblackfemales.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyAlgoLogic implements AlgoLogic {

    private static final Logger logger = LoggerFactory.getLogger(MyAlgoLogic.class);

    @Override
    public Action evaluate(SimpleAlgoState state, OrderSide side) {

        var orderBookAsString = Util.orderBookToString(state);
          
        logger.info("[MYALGO] The state of the order book is:\n" + orderBookAsString);   
    
    
        final BidLevel level = side == OrderSide.BUY ? state.getBidAt(0) : state.getAskAt(0);
    
        long quantity = 75;
        long price = level.price;
    
        // Logic for creating or cancelling orders
        if (side == OrderSide.BUY) {
          // got this from PassiveAlgo
          if (state.getChildOrders().size() < 3) {
            logger.info("[MYALGO] Joining passive side of book with: " + quantity + " @ " + price);
            return new CreateChildOrder(Side.BUY, quantity, price);
          } else {
            logger.info("[MYALGO] Done buying.");
            return NoAction.NoAction;
          }
        } else {
          // Logic for selling or cancelling orders
          if (/* condition for selling */) {
            // Create a sell order
            logger.info("[MYALGO] Selling: " + quantity + " @ " + price);
            return new CreateChildOrder(Side.SELL, quantity, price);
          } else if (/* condition for cancelling */) {
            // Implement specific cancelling logic - replace with appropriate action
            logger.info("[MYALGO] Cancelling existing orders.");
            return cancelExistingOrders(state); // Replace with specific cancelling method
          } else {
            logger.info("[MYALGO] Not selling or cancelling.");
            return NoAction.NoAction;
          }
        }
      }

    