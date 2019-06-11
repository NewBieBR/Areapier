package area42.area.Events;

import android.view.GestureDetector;
import android.view.MotionEvent;

public class SwipeListener extends GestureDetector.SimpleOnGestureListener {

    @Override
    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
        System.out.println("AAAA dans la classe");
        if (e1 == null || e2 == null)
            return false;
        float x1 = e1.getX();
        float y1 = e1.getY();
        float x2 = e2.getX();
        float y2 = e2.getY();
        double rad = Math.atan2(y1 - y2, x2 - x1) + Math.PI;
        rad = (rad * 180 / Math.PI + 180) % 360;
        return onSwipe(Direction.fromAngle(rad));
    }

    public boolean onSwipe(Direction direction){
        return false;
    }

    public enum Direction{
        up,
        down,
        left,
        right;

        public static Direction fromAngle(double angle){
            if (angle >= 45 && angle < 135) {
                return Direction.up;
            }
            else if ((angle >= 0 && angle < 45) || (angle >= 315 && angle < 360)) {
                return Direction.right;
            }
            else if (angle >= 225 && angle < 315) {
                return Direction.down;
            }
            else {
                return Direction.left;
            }

        }
    }
}
