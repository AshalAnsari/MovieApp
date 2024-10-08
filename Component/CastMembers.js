import React from 'react';
import { View , StyleSheet , Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { image185 } from '../api/moviedb';

var {width, height} = Dimensions.get("window")
function CastMembers({ cast , navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.castBox}
                                onPress={() => navigation.navigate("Person", person)}
                            >
                                <View style={styles.castContainer}>
                                    <Image
                                        style={styles.castImage}
                                        source={{uri: image185(person?.profile_path)}}
                                    />
                                    <Text style={styles.castText}>
                                        {person?.character.length>10 ? person?.character.slice(0,10)+"..." : person?.character}
                                    </Text>
                                    <Text style={styles.castText}>
                                        {person?.original_name.length>10 ? person?.original_name.slice(0,10)+"..." : person?.original_name}
                                    </Text>
                                </View>
                                
                            </TouchableOpacity>
                        )
                    })
                }   
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
    },
    text:{
        color:"white",
        fontSize:20,
        fontWeight:"600",
        marginBottom:20,
        marginLeft:15
    },
    castBox:{
        marginRight:4,
        alignContent:"center",
    },
    castContainer:{
        marginRight:20
    },
    castImage:{
        height:100,
        width:100,
        borderRadius:50,
    },
    castText:{
        color:"white",
        textAlign:"center"
    }
}
);

export default CastMembers;