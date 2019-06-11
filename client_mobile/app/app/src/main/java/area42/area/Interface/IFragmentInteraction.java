package area42.area.Interface;

import area42.area.Events.SwipeListener;

public interface IFragmentInteraction {
    void changeFragmentByDirection(SwipeListener.Direction x);
    void launchActivityFromLogo(int posService, int numberPageRecycler);
}
