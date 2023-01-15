package com.svindland.fitness;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.adscientiam.capacitor.googlefit.GoogleFitPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(GoogleFitPlugin.class);
    }
}
