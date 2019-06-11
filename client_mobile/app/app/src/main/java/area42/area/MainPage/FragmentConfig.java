package area42.area.MainPage;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import area42.area.Events.SwipeListener;
import area42.area.Interface.IDisplay;
import area42.area.Interface.IFragmentInteraction;
import area42.area.R;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;
import area42.area.Welcome;

public class FragmentConfig extends Fragment implements View.OnTouchListener, IDisplay {
    private static String _token;
    private static RouteData _routeData;

    //ArrayList<String> _url = new ArrayList<>();

    private TextView _txtViewUsername;
    private IFragmentInteraction mListener;
    private SwipeListener swip;
    private GestureDetector g;
    private String _username = "username";
    private Button _btnAddingPicture;
    private ImageView _imagePicture;
    private RequestHttp _request;
    private static final int GALLERY_REQUEST = 1;

    public FragmentConfig() {
    }

    public static FragmentConfig newInstance(String token, RouteData routeData) {
        FragmentConfig fragment = new FragmentConfig();
        Bundle args = new Bundle();
        _token = token;
        _routeData = routeData;
        /*args.putStringArrayList("test", urls);
        fragment.setArguments(args);*/
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            //_url = getArguments().getStringArrayList("test");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.config_frag, container, false);
        /*RecyclerView recyclerView = (RecyclerView)v.findViewById(R.id.rc);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerServices adapter = new RecyclerServices(getContext(), _url);
        recyclerView.setAdapter(adapter);*/

        _btnAddingPicture = v.findViewById(R.id.btnAddingPicture);
        _btnAddingPicture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadPictureFormGallery();
            }
        });

        try {
            _request = new RequestHttp(this);
            _request.setToken(_token);
            _request.doGetRequest(_routeData.getRouteGet(RouteEnum.GET.USER_DATA.ordinal()), "");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        _txtViewUsername = v.findViewById(R.id.txtUsername);
        _txtViewUsername.setText(_username);
        Button btnDisconnect = v.findViewById(R.id.btnDisconnect);
        btnDisconnect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                disconnect();
            }
        });

        _imagePicture = v.findViewById(R.id.profilePicture);

        swip = new SwipeListener() {
            @Override
            public boolean onSwipe(Direction direction) {
                mListener.changeFragmentByDirection(direction);
                System.out.println("AAAA ici");
                return true;
            }
        };
        g = new GestureDetector(getActivity(), swip);
        //(v.findViewById(R.id.conf)).setOnTouchListener(this);
        (v.findViewById(R.id.scr)).setOnTouchListener(this);
        (v.findViewById(R.id.test)).setOnTouchListener(this);
        v.setOnTouchListener(this);
        return v;
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
        System.out.println("AAAA cdvdvdv");

        // WEIRD METHOD

        g.onTouchEvent(event);
        return true;
    }

    private void disconnect() {
        Intent intent = new Intent(getActivity(), Welcome.class);
        intent.putExtra("Error", "Well Disconnected");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == Activity.RESULT_OK)
            switch (requestCode){
                case GALLERY_REQUEST:
                    Uri selectedImage = data.getData();
                    try {
                        Bitmap bitmap = MediaStore.Images.Media.getBitmap(getActivity().getContentResolver(), selectedImage);
                        _imagePicture.setImageBitmap(bitmap);
                    } catch (IOException e) {
                        Log.i("TAG", "Some exception " + e);
                    }
                    break;
            }
    }

    private void loadPictureFormGallery() {
        Toast.makeText(getContext(), "Load Image", Toast.LENGTH_LONG).show();
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, GALLERY_REQUEST);
    }

    @Override
    public void treatRequestHttp(int code, String res, String url) {
        try {
            Log.wtf("resultat______username_txt", "res : " + res + ",url :" + url);
            JSONObject obj = new JSONObject(res);
            JSONArray objArray = obj.getJSONArray("users");
            _username = objArray.getJSONObject(0).getString("username");
            _txtViewUsername.setText(_username);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
