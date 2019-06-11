package area42.area.Fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import area42.area.R;


/**
 * A simple {@link Fragment} subclass.
 */
public class MainFragment extends IFragments {
    private TextView _txtName;
    private TextView _txtDescription;
    private EditText _edit;
    private String _strParameters;
    public View _view;
    boolean _needded = false;

    String _name;
    String _description;

    public MainFragment() {
        // Required empty public constructor
        Log.wtf("=============================>", "Construct main");
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            _strParameters = getArguments().getString("Parameters");

            try {
                JSONObject parameters = new JSONObject(_strParameters);
                _name = parameters.getString("name");
                _description = parameters.getString("description");
                parameters.getString("type");
                if (parameters.getBoolean("required"))
                    _needded = true;

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        _view = inflater.inflate(R.layout.frag_str, container, false);
        _edit = _view.findViewById(R.id.editStr);
        setText();
        return _view;
    }

    public void setText() {
        _txtName = _view.findViewById(R.id.txtName);
        _txtName.setText(_name);

        _txtDescription = _view.findViewById(R.id.txtDescription);
        _txtDescription.setText(_description);
    }

    @Override
    public JSONObject getParameters() {

        if(_needded && _edit.getText().toString().isEmpty()) {
            _edit.setError("Required");
            return null;
        }

        JSONObject tmp = new JSONObject();
        try {
            tmp.put(_txtName.getText().toString(), _edit.getText().toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return tmp;
    }
}
