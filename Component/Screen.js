import React from 'react';
import { View , StyleSheet, SafeAreaView, Platform } from 'react-native';

function Screen({children}) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS === "android" ? 20 : 0,
    },
});

export default Screen;