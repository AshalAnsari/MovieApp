import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View , StyleSheet , Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback , Image, Dimensions} from 'react-native';
import { image185 } from '../api/moviedb';

var {width, height} = Dimensions.get("window")

function MovieList({ title , data , hideSeeAll}) {
    const navigation = useNavigation();

    let movieName = "The Batman - 2023"

    return (
        <View style={styles.container}>
            <View style={styles.ListContainer}>
                <Text style={styles.title}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.button}>See All</Text>
                        </TouchableOpacity>
                    )
                }   
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    // source={require("../assets/TheBatman.png")}
                                    source={{uri: image185(item.poster_path)}}
                                    style={styles.image}
                                />
                                <Text style={styles.imageText}>
                                    {item.title.length > 14 ? item.title.slice(0,14)+"...":item.title}
                                </Text>
                            </View>    
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginRight:10,
        marginTop:20,
    },
    ListContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    title:{
        fontSize:20,
        color:"white",
        fontWeight:"bold",
        marginLeft:20
    },
    button:{
        fontSize:20,
        color:"yellow"
    },
    imageContainer:{
        margin:10,
        marginTop:25,
    },
    image:{
        borderRadius:20,
        width:width*0.33,
        height:height*0.22,
    },
    imageText:{
        color:"white"
    }
});

export default MovieList;