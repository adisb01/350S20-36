package edu.upenn.cis350.androidapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Date;

import edu.upenn.cis350.androidapp.LocationAdapter.PlaceAutoSuggestAdapter;

public class PostFoundActivity extends AppCompatActivity {

    private long posterId;
    private String category = "";
    private String around = "";

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_found);
        posterId = getIntent().getLongExtra("userId", -1);
        AutoCompleteTextView autoCompleteTextView = findViewById(R.id.found_location);
        autoCompleteTextView.setAdapter(new PlaceAutoSuggestAdapter(this, android.R.layout.simple_list_item_1));
        Spinner spinner = (Spinner) findViewById(R.id.found_category_spinner);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position,
                                       long id) {
                if (parentView.getItemAtPosition(position).toString().equals("Other")) {
                    ((TextView) findViewById(R.id.found_not_category)).setVisibility(View.VISIBLE);
                    ((EditText) findViewById(R.id.found_other_category)).setVisibility(View.VISIBLE);
                } else {
                    ((TextView) findViewById(R.id.found_not_category)).setVisibility(View.INVISIBLE);
                    ((EditText) findViewById(R.id.found_other_category)).setVisibility(View.INVISIBLE);
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parentView){}
        });
    }

    public void onMakeFoundClick(View v) {
        Spinner spinner = (Spinner) findViewById(R.id.found_category_spinner);
        if (spinner.getSelectedItem().toString().equals("Other")) {
            EditText other = (EditText) findViewById(R.id.found_other_category);
            category = other.getText().toString();
        } else {
            category = spinner.getSelectedItem().toString();
        }

        EditText location = (EditText) findViewById(R.id.found_location);
        around = location.getText().toString();

        int id = -1;
        Date date = new Date();
        double latitude = -1;
        double longitude = -1;
        String attachmentLoc = "";

        Intent i = new Intent(this, MainActivity.class);
        i.putExtra("userId", posterId);
        i.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(i);
    }

}
