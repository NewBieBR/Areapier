package area42.area.MainPage;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

import area42.area.Events.SwipeListener;
import area42.area.Fragments.RecyclerServices;
import area42.area.Interface.IFragmentInteraction;
import area42.area.R;

public class FragmentRecycler extends Fragment implements View.OnTouchListener {

    ArrayList<String> _url = new ArrayList<>();
    ArrayList<String> _txt = new ArrayList<>();
    String _name = "MY AREA";
    RecyclerServices _services;

    private IFragmentInteraction mListener;
    private GestureDetector gesture;

    public FragmentRecycler() {
    }

    public static FragmentRecycler newInstance(ArrayList<String> urls, String name, ArrayList<String> txt) {
        FragmentRecycler fragment = new FragmentRecycler();
        Bundle args = new Bundle();
        args.putStringArrayList("test", urls);
        if (name != null) {
            args.putString("name", name);
        }
        if (txt != null) {
            args.putStringArrayList("text", txt);
        }
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            _url = getArguments().getStringArrayList("test");
            if (getArguments().getString("name") != null && getArguments().getString("name") != "") {
                _name = getArguments().getString("name");
            }
            if (getArguments().getStringArrayList("text") != null) {
                _txt = getArguments().getStringArrayList("text");
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.recycler_frag, container, false);
        RecyclerView recyclerView = (RecyclerView)v.findViewById(R.id.rc);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        _services = new RecyclerServices(getContext(), _url, _txt);
        recyclerView.setAdapter(_services);

        gesture = new GestureDetector(getContext(),
                new SwipeListener() {
                    @Override
                    public boolean onSwipe(Direction direction) {
                        mListener.changeFragmentByDirection(direction);
                        return true;
                    }
                });
        TextView title = (TextView) v.findViewById(R.id.titleServiceFrag);
        title.setText(_name);
        recyclerView.setOnTouchListener(this);
        v.setOnTouchListener(this);
        return v;
    }

    public void update() {
        if (_services != null)
            _services.notifyDataSetChanged();
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof IFragmentInteraction) {
            mListener = (IFragmentInteraction) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement IFragmentInteraction");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        if (gesture != null)
            return gesture.onTouchEvent(event);
        return false;
    }
}
