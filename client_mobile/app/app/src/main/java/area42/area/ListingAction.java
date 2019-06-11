package area42.area;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import area42.area.Utils.RegisterData;
import area42.area.Utils.RouteData;

public class ListingAction extends AppCompatActivity {
    Context _page;
    private String _strObjAreaActionJson = "";
    private String _strObjAreaReactionJson = "";

    private JSONObject _objAction;
    private JSONObject _objReaction;

    private RouteData routeData;
    private String _token;
    private RegisterData _dataUser;
    private String _url = "";
    private String _color = "";
    private String _name = "";
    private String _type = "";
    private String _NewAreaAction = "";
    boolean _typeListing = false;


    @TargetApi(Build.VERSION_CODES.M)
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listing_action);

        _page = this;

        //Recup Params
        Bundle arg = getIntent().getExtras();
        _dataUser = (RegisterData) arg.get("DataRegister");
        routeData = (RouteData) arg.get("RouteData");
        _token = (String) arg.get("token");
        _type = (String) arg.get("Type");
        String strService = (String) arg.get("Service");

        if (_type.compareTo("Action") == 0) {
            _typeListing = true;
        } else {
            _NewAreaAction = (String) arg.get("ObjAreaAction");
            //Toast.makeText(_page, _NewAreaAction, Toast.LENGTH_LONG).show();
        }

        JSONObject jObject = null;
        JSONArray allAction = new JSONArray();
        JSONArray allReaction = new JSONArray();

        try {
            jObject = new JSONObject(strService);

            _url = jObject.getString("imageUrl");
            _color = jObject.getString("colorTheme");
            if (_color.compareTo("") == 0) {
                _color = "#ffffff";
            }
            _name = jObject.getString("name");

            if (_typeListing) {
                allAction = jObject.getJSONArray("actions");

                _objAction = new JSONObject();
                _objAction.put("classeName", jObject.get("classeName"));
            } else {
                allAction = jObject.getJSONArray("actions");
                allReaction = jObject.getJSONArray("reactions");

                _objReaction = new JSONObject();
                _objReaction.put("classeName", jObject.get("classeName"));
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }


        final String token = arg.getString("token");

        HashMap<Integer, Button> allButtons = new HashMap<>();

        FrameLayout framelayoutParent = new FrameLayout(this);
        framelayoutParent.setLayoutParams(new AbsListView.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
        framelayoutParent.setBackgroundResource(R.color.colorAreaLight);


        //Create Title of the service action
        TextView txtShowService = new TextView(this);
        //TODO put the title right there
        txtShowService.setText(_type + " " + _name);
        txtShowService.setTextSize(30);
        txtShowService.setGravity(Gravity.CENTER);
        txtShowService.setTextColor(Color.parseColor("White"));
        txtShowService.setBackgroundColor(Color.parseColor("Blue"));
        txtShowService.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT));
        FrameLayout.LayoutParams flTitleAction = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        flTitleAction.setMargins(0,0,0,0);
        flTitleAction.height = 200;
        txtShowService.setLayoutParams(flTitleAction);
        framelayoutParent.addView(txtShowService);

        //Create a Image of service
        ImageView imgShowAction = new ImageView(this);

        Picasso.get().load(_url).placeholder(R.mipmap.ic_logo_foreground).into(imgShowAction);
        imgShowAction.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT));
        FrameLayout.LayoutParams flImgService = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        flImgService.setMargins(0,0,0,0);
        flImgService.height = 350;
        imgShowAction.setLayoutParams(flImgService);

        //Create a Scroller
        ScrollView scroller = new ScrollView(this);
        LinearLayout.LayoutParams ll = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT);
        ll.setMargins(0,300,0,100);
        scroller.setLayoutParams(ll);

        //Initializing frame layout
        FrameLayout framelayout = new FrameLayout(this);
        framelayout.setLayoutParams(new AbsListView.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
        framelayout.setFocusable(true);
        this.getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

        framelayout.addView(imgShowAction);
        int top = 500;
        //Tmp string
        String str = "a";

        JSONArray listingAction = new JSONArray();
        if (_typeListing) {
            listingAction = allAction;
            //Log.wtf("Length_listingAction_===========>", "here all action");
        } else {
            listingAction = allReaction;
            //Log.wtf("Length_listingAction_===========>", "here all Reaction");

        }

        Log.wtf("Length_allAction_===========>", String.valueOf(allAction.length()));
        Log.wtf("Length_allReaction_===========>", String.valueOf(allReaction.length()));
        Log.wtf("Length_listingAction_===========>", String.valueOf(listingAction.length()));
        for (int i = 0; i < listingAction.length(); i++) {
            int id = i + 1;

            Button btn = new Button(this);

            btn.setId(id);

            str = "";
            try {
                str = listingAction.getJSONObject(i).getString("name");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            btn.setText(str);
            if (_color == "#ffffff") {
                btn.setTextColor(Color.BLACK);
            } else {
                btn.setTextColor(Color.WHITE);
            }
            btn.setTextSize(20);
            btn.setGravity(Gravity.CENTER);
            btn.setTypeface(null, Typeface.BOLD);
            btn.setBackground(ContextCompat.getDrawable(this, R.drawable.button_shape));
            GradientDrawable drawable = (GradientDrawable) btn.getBackground();
            drawable.setColor(Color.parseColor(_color));
            btn.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT,
                    RelativeLayout.LayoutParams.WRAP_CONTENT));
            FrameLayout.LayoutParams flBtn = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
            flBtn.setMargins(50, top,50,0);
            flBtn.height = 150;
            btn.setLayoutParams(flBtn);

            allButtons.put(id, btn);
            framelayout.addView(btn);
            top += 250;
        }
        scroller.addView(framelayout);

        framelayoutParent.addView(scroller);
        setContentView(framelayoutParent);

        for (int i = 1; i < listingAction.length() + 1; i++) {

            Button tmpBtn = allButtons.get(i);
            final JSONArray finalListingAction = listingAction;
            final JSONArray finalAllAction = allAction;
            final int finalI = i - 1;
            tmpBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    String strParameters = "";
                    String strReturnValue = "";
                    String strType = "Action";
                    Intent intent = new Intent(_page , ServiceParams.class);

                    String tmp = "oui";

                    try {
                        strParameters = finalListingAction.getJSONObject(finalI).getJSONArray("parameters").toString();
                        if (!_typeListing) {
                            //If reaction if faut fet les return value des Actions
                            //If recation get funcname => str
                            strType = "Reaction";
                            //strReturnValue = finalAllAction.getJSONObject(finalI).getJSONArray("parameters").toString();

                            _objReaction.put("funcName", finalListingAction.getJSONObject(finalI).getString("funcName"));
                            _strObjAreaReactionJson = _objReaction.toString();

                            intent.putExtra("ObjAreaReaction", _strObjAreaReactionJson);

                            //intent.putExtra("ReturnValue", strReturnValue);
                            intent.putExtra("ObjAreaAction", _NewAreaAction);

                            tmp = "STR obj area react + action => " + _strObjAreaReactionJson + "    |     " + _NewAreaAction;
                        } else {
                            //else if Action get funcName => str
                            _objAction.put("funcName", finalListingAction.getJSONObject(finalI).getString("funcName"));
                            _strObjAreaActionJson = _objAction.toString();
                            intent.putExtra("ObjAreaAction", _strObjAreaActionJson);
                            tmp = "STR obj area action => " +  _strObjAreaActionJson;

                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    Log.wtf("=========================================>", tmp);
                    //Toast.makeText(_page, tmp, Toast.LENGTH_LONG).show();

                    intent.putExtra("RouteData", routeData);
                    intent.putExtra("token", _token);
                    intent.putExtra("DataRegister", _dataUser);
                    intent.putExtra("Parameters", strParameters);
                    intent.putExtra("Type", strType);
                    intent.putExtra("Name", _type + " " + _name);
                    startActivity(intent);
                }
            });
        }

    }
}
