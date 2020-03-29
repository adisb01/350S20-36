package edu.upenn.cis350.androidapp;

import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;

import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;
import android.widget.Toast;
import android.content.*;


import java.util.*;
import edu.upenn.cis350.androidapp.ui.main.SectionsPagerAdapter;
import edu.upenn.cis350.androidapp.DataInteraction.Management.ItemManagement.*;
import edu.upenn.cis350.androidapp.MessagingActivities.ChatsActivity;
import edu.upenn.cis350.androidapp.DataInteraction.Data.LostItem;

public class MainActivity extends AppCompatActivity {

    private long userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SectionsPagerAdapter sectionsPagerAdapter = new SectionsPagerAdapter(this, getSupportFragmentManager());
        ViewPager viewPager = findViewById(R.id.view_pager);
        viewPager.setAdapter(sectionsPagerAdapter);
        TabLayout tabs = findViewById(R.id.tabs);
        tabs.setupWithViewPager(viewPager);
        FloatingActionButton fab = findViewById(R.id.fab);

//        // You could make this the Create Posting button
//        fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent i = new Intent(this, NewPostActivity.class);
//            }
//        });
        userId = getIntent().getLongExtra("userId", -1);
        Toast.makeText(getApplicationContext(),
                "Login ID: " + userId + " Username: " +
                        getIntent().getStringExtra("username"), Toast.LENGTH_LONG).show();

        Collection<LostItem> lostItems = LostJSONReader.getInstance().getAllLostItems();
        for (LostItem i : lostItems) {
            System.out.println(i);
        }
        Log.d("MainActivity", "Got all lost items");
    }

    public void onPlusClick(View v){
        Intent i = new Intent(this, NewPostActivity.class);
        i.putExtra("userId", userId);
        startActivity(i);
    }

   public void onMessageClick(View v) {
        Intent i = new Intent(this, ChatsActivity.class);
        i.putExtra("userId", userId);
        startActivity(i);
    }

}