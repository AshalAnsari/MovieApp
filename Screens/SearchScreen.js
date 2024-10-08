import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View , StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import Loading from '../Component/Loading';
import { debounce } from 'lodash';
import { image185, searchMovies } from '../api/moviedb';

var {width, height} = Dimensions.get("window")

function SearchScreen(props) {
    const navigation = useNavigation();
    const [result , setResult] = useState([])
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     console.log("result is " , result);
    // }, [result]);

    const handleSearch = value => {
        if(value && value.length > 2){
            setLoading(true)
            searchMovies({
                query: value, 
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data => {
                setLoading(false);
                if(data && data.results) {
                    setResult(data.results);
                }
            })
        }
        else{
            setLoading(false);
            setResult([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    let movieName = "The Batman"
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <TextInput 
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    style={styles.searchContainer}
                />
                <TouchableOpacity onPress={() =>navigation.navigate("Home")}>
                    <MaterialCommunityIcons name="close-circle" size={55} color={"white"}/>
                </TouchableOpacity>
            </View>

            {
                loading?
                <Loading/>:
                result.length>0? 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:15}}
                    >
                        <Text style={styles.results}>Results ({result.length})</Text>
                        <View style={styles.resultsContainer}>
                        {
                            result.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.navigate('Movie', item)}
                                    >
                                        <View>
                                            <Image
                                                // source={require("../assets/TheBatman.png")}
                                                source={{uri: image185(item?.poster_path)}}
                                                style={styles.image}
                                            />
                                            <Text>{
                                                item.title.length>10 ? item.title.slice(0,10)+"..." : item.title
                                            }</Text>
                                        </View>
                                        
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                        </View>       
                    </ScrollView>
                :
                <View style={styles.noResultContainer}>
                    <Image
                        source={require("../assets/MovieTime.png")}
                        style={{height:300,width:300}}
                    />
                </View>
            }            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#333"
    },
    viewContainer:{
        marginHorizontal:10,
        marginBottom:3,
        borderWidth:1,
        borderColor:"gray",
        borderRadius:40,
        marginTop:15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    searchContainer:{
        paddingLeft:20,
        fontSize:15
    },
    results:{
        color:"white",
        fontSize:15,
        marginTop:15
    },
    resultsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    image:{
        height:height*0.3,
        width:width*0.44,
        marginVertical:10
    },
    noResultContainer:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:70
    }
});

export default SearchScreen;