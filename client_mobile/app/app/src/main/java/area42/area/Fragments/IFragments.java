package area42.area.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;

import org.json.JSONException;
import org.json.JSONObject;

public abstract class IFragments extends Fragment {

    public static IFragments newInstance(JSONObject parameter) {

        String _type = "";
        IFragments fr = null;
        Bundle args = new Bundle();
        try {
            _type = parameter.getString("type");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String strParameter = parameter.toString();
        args.putString("Parameters", strParameter);

        //email, string, list, number
        if (_type.compareTo("string") == 0) {
            fr = new MainFragment();
        } else if (_type.compareTo("number") == 0) {
            fr = new SecondFragment();
        } else if (_type.compareTo("email") == 0) {
            fr = new EmailFragment();
        } else if (_type.compareTo("list") == 0) {
            fr = new ListFragment();
        }

        fr.setArguments(args);
        return fr;
    }

    public void setText() {}

    public abstract JSONObject getParameters();

}
