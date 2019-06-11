package area42.area.Fragments;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.makeramen.roundedimageview.RoundedTransformationBuilder;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Transformation;

import java.util.ArrayList;
import java.util.List;

import area42.area.Interface.IDisplay;
import area42.area.Interface.IFragmentInteraction;
import area42.area.R;

public class RecyclerServices extends RecyclerView.Adapter<RecyclerServices.ViewHolder> {

    private List<String> mData;
    private List<String> _txt;
    private LayoutInflater mInflater;
    private Context _page;

    public RecyclerServices(Context context, List<String> data, List<String> txt) {
        _page = context;
        mInflater = LayoutInflater.from(context);
        mData = data;
        _txt = txt;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.recycler_with_text, parent, false);
        final ViewHolder holder = new ViewHolder(view);
        holder.setIsRecyclable(false);
        return holder;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {


        if (mData != null) {
            if (mData.size() > (position * 10) - (position))
                Picasso.get().load(mData.get((position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service1);
            if (mData.size() > 1 + (position * 10) - (position))
                Picasso.get().load(mData.get(1 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service2);
            if (mData.size() > 2 + (position * 10) - (position))
                Picasso.get().load(mData.get(2 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service3);
            if (mData.size() > 3 + (position * 10) - (position))
                Picasso.get().load(mData.get(3 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service4);
            if (mData.size() > 4 + (position * 10) - (position))
                Picasso.get().load(mData.get(4 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service5);
            if (mData.size() > 5 + (position * 10) - (position))
                Picasso.get().load(mData.get(5 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service6);
            if (mData.size() > 6 + (position * 10) - (position))
                Picasso.get().load(mData.get(6 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service7);
            if (mData.size() > 7 + (position * 10) - (position))
                Picasso.get().load(mData.get(7 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service8);
            if (mData.size() > 8 + (position * 10) - (position))
                Picasso.get().load(mData.get(8 + (position * 10) - (position))).placeholder(R.mipmap.ic_logo_foreground).into(holder._service9);
        }



            if (_txt != null) {
                if (_txt.size() > (position * 10) - (position))
                    holder._text1.setText(_txt.get((position * 10) - (position)));
                if (_txt.size() > 1 + (position * 10) - (position))
                    holder._text2.setText(_txt.get(1 + (position * 10) - (position)));
                if (_txt.size() > 2 + (position * 10) - (position))
                    holder._text3.setText(_txt.get(2 + (position * 10) - (position)));
                if (_txt.size() > 3 + (position * 10) - (position))
                    holder._text4.setText(_txt.get(3 + (position * 10) - (position)));
                if (_txt.size() > 4 + (position * 10) - (position))
                    holder._text5.setText(_txt.get(4 + (position * 10) - (position)));
                if (_txt.size() > 5 + (position * 10) - (position))
                    holder._text6.setText(_txt.get(5 + (position * 10) - (position)));
                if (_txt.size() > 6 + (position * 10) - (position))
                    holder._text7.setText(_txt.get(6 + (position * 10) - (position)));
                if (_txt.size() > 7 + (position * 10) - (position))
                    holder._text8.setText(_txt.get(7 + (position * 10) - (position)));
                if (_txt.size() > 8 + (position * 10) - (position))
                    holder._text9.setText(_txt.get(8 + (position * 10) - (position)));


            }
    }

    @Override
    public int getItemCount() {
        if (mData != null && _txt.size() < mData.size()) {
            if (mData.size() <= 9)
                return (1);
            int size = mData.size() / 9;
            if (mData.size() % 9 != 0)
                size += 1;
            return (size);
        }
        else if (_txt != null) {
            if (_txt.size() <= 9)
                return (1);
            int size = _txt.size() / 9;
            if (_txt.size() % 9 != 0)
                size += 1;
            return (size);
        }
        return (1);
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ImageView _service1;
        ImageView _service2;
        ImageView _service3;
        ImageView _service4;
        ImageView _service5;
        ImageView _service6;
        ImageView _service7;
        ImageView _service8;
        ImageView _service9;

        TextView _text1;
        TextView _text2;
        TextView _text3;
        TextView _text4;
        TextView _text5;
        TextView _text6;
        TextView _text7;
        TextView _text8;
        TextView _text9;

        ViewHolder(View itemView) {
            super(itemView);
            _service1 = (ImageView)itemView.findViewById(R.id.service1);
            _service2 = (ImageView)itemView.findViewById(R.id.service2);
            _service3 = (ImageView)itemView.findViewById(R.id.service3);
            _service4 = (ImageView)itemView.findViewById(R.id.service4);
            _service5 = (ImageView)itemView.findViewById(R.id.service5);
            _service6 = (ImageView)itemView.findViewById(R.id.service6);
            _service7 = (ImageView)itemView.findViewById(R.id.service7);
            _service8 = (ImageView)itemView.findViewById(R.id.service8);
            _service9 = (ImageView)itemView.findViewById(R.id.service9);
            //itemView.setOnClickListener(this);

            /*_service1.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Picasso.get().load("https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_960_720.png").into(_service1);
                    // your code here
                }
            });*/


            _text1 = (TextView) itemView.findViewById(R.id.text1);
            _text2 = (TextView) itemView.findViewById(R.id.text2);
            _text3 = (TextView) itemView.findViewById(R.id.text3);
            _text4 = (TextView) itemView.findViewById(R.id.text4);
            _text5 = (TextView) itemView.findViewById(R.id.text5);
            _text6 = (TextView) itemView.findViewById(R.id.text6);
            _text7 = (TextView) itemView.findViewById(R.id.text7);
            _text8 = (TextView) itemView.findViewById(R.id.text8);
            _text9 = (TextView) itemView.findViewById(R.id.text9);

            /////// SALE = SOLUTION NOT FOUND

            _service1.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(0, pos);
                    }
                    Transformation transformation = new RoundedTransformationBuilder()
                                                    .borderColor(Color.WHITE)
                                                    .borderWidthDp(3)
                                                    .cornerRadiusDp(50)
                                                    .oval(false)
                                                    .build();
                }
            });
            _service2.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(1, pos);
                    }
                }
            });
            _service3.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(2, pos);
                    }
                }
            });
            _service4.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(3, pos);
                    }
                }
            });
            _service5.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(4, pos);
                    }
                }
            });
            _service6.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(5, pos);
                    }
                }
            });
            _service7.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(6, pos);
                    }
                }
            });
            _service8.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(7, pos);
                    }
                }
            });
            _service9.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    int pos = getAdapterPosition();
                    if(pos != RecyclerView.NO_POSITION) {
                        ((IFragmentInteraction)_page).launchActivityFromLogo(8, pos);
                    }
                }
            });
        }

        @Override
        public void onClick(View view) {
            return;
        }
    }
}