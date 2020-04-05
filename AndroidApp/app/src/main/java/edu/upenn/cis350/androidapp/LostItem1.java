package edu.upenn.cis350.androidapp;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.TextView;

import java.io.Serializable;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

import edu.upenn.cis350.androidapp.DataInteraction.Data.LostItem;
import edu.upenn.cis350.androidapp.DataInteraction.Processing.ItemProcessing.FoundJSONProcessor;
import edu.upenn.cis350.androidapp.DataInteraction.Processing.ItemProcessing.LostJSONProcessor;
import edu.upenn.cis350.androidapp.ui.main.PlaceholderFragment;

public class LostItem1 extends AppCompatActivity {

    private LostItem item;
    private String category;
    private String time;
    private String location;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lost_item1);
        long itemId = getIntent().getLongExtra("itemId", -1);
        item = LostJSONProcessor.getInstance().getLostItemById(itemId);
        TextView lostItemCategory = findViewById(R.id.lostItemCategory);
        category = item.getCategory();
        lostItemCategory.setText(category);
        TextView lostItemTime = findViewById(R.id.lostItemTime);
        Format f = new SimpleDateFormat("MM/dd/yy");
        String date = f.format(item.getDate());
        time = "Lost " + date + " (" + setTime(item.getDate()) + ")";
        lostItemTime.setText(time);
        TextView lostItemAround = findViewById(R.id.lostItemAround);
        location = "Around: " + item.getLocation();
        lostItemAround.setText(location);
        TextView lostItemDescription = findViewById(R.id.lostItemDescription);
        lostItemDescription.setText(item.getDescription());
        TextView lostItemAdditionalInfo = findViewById(R.id.lostItemAdditionalInfo);
        lostItemAdditionalInfo.setText(item.getAdditionalInfo());
    }

    public String setTime (Date old) {
        long diff = new Date().getTime() - old.getTime();
        if (diff < 1000) {
            return "now";
        } else if (diff < 60000) {
            return diff / 1000 + " second(s) ago";
        } else if (diff < 3600000) {
            return diff / 60000 + " minute(s) ago";
        } else if (diff < 86400000 * 2) {
            return diff / 3600000 + " hour(s) ago";
        } else {
            return diff / 86400000 + " day(s) ago";
        }
    }

    public void onFoundItemMessageUserClick(View v){
        Intent i = new Intent(this, LostItem2.class);
        i.putExtra("category", category);
        i.putExtra("time", time);
        i.putExtra("location", location);
        startActivity(i);
    }

}
