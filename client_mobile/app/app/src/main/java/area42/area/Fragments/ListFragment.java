package area42.area.Fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import area42.area.R;


/**
 * A simple {@link Fragment} subclass.
 */
public class ListFragment extends IFragments {
    private TextView _txtName;
    private TextView _txtDescription;
    private String _strParameters;
    private Spinner _spinnerList;
    public View _view;

    String _name;
    String _description;

    HashMap<String, String> _mapList = new HashMap<>();

    public ListFragment() {
        // Required empty public constructor
        Log.wtf("=============================>", "Construct List");
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
                parameters.getString("required");
                JSONArray arrayListParams = parameters.getJSONArray("default");


                for (int i = 0; i < arrayListParams.length(); i++) {
                    _mapList.put(arrayListParams.getJSONObject(i).getString("name"), arrayListParams.getJSONObject(i).getString("value"));
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        _view = inflater.inflate(R.layout.frag_list, container, false);

        _spinnerList = _view.findViewById(R.id.spinnerList);

        List<String> allListName = new ArrayList<String>();


        for(Map.Entry<String, String> entry : _mapList.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            allListName.add(key);

        }

        ArrayAdapter<String> adaptater = new ArrayAdapter<String>(_view.getContext(), android.R.layout.simple_list_item_1, allListName);
        _spinnerList.setAdapter(adaptater);

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
        JSONObject tmp = new JSONObject();
        try {
            tmp.put(_name, _mapList.get(_spinnerList.getSelectedItem().toString()));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return tmp;
    }
}
