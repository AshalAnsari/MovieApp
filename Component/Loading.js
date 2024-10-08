import React from 'react';
import { View , StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress'

var {width, height} = Dimensions.get("window")

function Loading(props) {
    return (
        <View style={styles.container}>
            <Progress.CircleSnail thickness={12} size={160} color={"yellow"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width, 
        height, 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        position:"absolute",
    },
});

export default Loading;