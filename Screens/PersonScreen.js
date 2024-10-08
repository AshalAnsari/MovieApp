import React, { useEffect } from 'react';
import { View , StyleSheet , Text, Dimensions, ScrollView, Platform, StatusBar,SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../Component/MovieList';
import Loading from '../Component/Loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
var {width, height} = Dimensions.get("window")

function PersonScreen(props) {
    const [isFavourite , setIsFavourite] = useState(false);
    const navigation = useNavigation()
    const [ personMovies , setPersonMovies ] = useState([])
    const [ person , setPerson ] = useState({})
    const [loading, setLoading] = useState(false);
    const {params: item} = useRoute();

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    },[item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if(data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        if(data && data.cast) setPersonMovies(data.cast);
    }

    return (
            <ScrollView 
            contentContainerStyle={{paddingBottom:20, backgroundColor:"rgba(0,0,0,0.9)"}}
            >
                <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left-box" size={40} color="yellow" style={{marginLeft:15}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <MaterialCommunityIcons name="heart" size={35} color={isFavourite? "red": "white"} style={{marginRight:15}}/>
                </TouchableOpacity>
                </SafeAreaView>

                {
                    loading?
                    <Loading/>
                    :
                    <>
                        <View >
                        <View style={styles.imageContainer}>
                            <View style={styles.imageDetails}>
                                <Image
                                    source={{uri: image342(person?.profile_path)}}
                                    style={styles.image}
                                />
                            </View>
                        </View>

                        <View style={styles.personBox}>
                            <Text style={styles.personName}>{person?.name}</Text>
                            <Text  style={styles.personResidence}>{person?.place_of_birth}</Text>
                        </View>

                        <View style={styles.personContainer}>
                            <View style={styles.personDetails}>
                                <Text style={styles.detailText}>Gender</Text>
                                <Text style={styles.personDetailText}>{person?.gender == 1? "Female" : "Male"}</Text>
                            </View>
                            <View style={styles.personDetails}>
                                <Text style={styles.detailText}>Birthday</Text>
                                <Text style={styles.personDetailText}>{person?.birthday}</Text>
                            </View>
                            <View style={styles.personDetails}>
                                <Text style={styles.detailText}>Known for</Text>
                                <Text style={styles.personDetailText}>{person?.known_for_department}</Text>
                            </View>
                            <View style={styles.personDetail}>
                                <Text style={styles.detailText}>Popularity</Text>
                                <Text style={styles.personDetailText}>{person?.popularity} %</Text>
                            </View>
                        </View>

                        <View style={styles.biographyContainer}>
                            <Text style={styles.biographyHeading}>Biography</Text>
                            <Text style={styles.personDetailText}>{person?.biography || 'N/A'}</Text>
                        </View>

                        </View>
                        <MovieList title="Movies" data={personMovies} hideSeeAll={true}/>
                    </>
                }
            </ScrollView>        
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:Platform.OS == 'ios' ? 30 : '',
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:4,
        zIndex:20,
    },
    imageContainer:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:40
    }, 
    imageDetails:{
        shadowColor:"gray",
        shadowRadius:40,
        shadowOffset:{widht: 0, height: 5},
        shadowOpacity:1
    },
    image:{
        width:width*0.74,
        height:height*0.35,
        borderRadius:Math.min(width, height) / 2,
        overflow:"hidden",
        borderWidth:1,
        borderColor:"#777777"
    },
    personBox:{
        marginTop:25,
    },
    personName:{
        color:"white",
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center"
    },
    personResidence:{
        color:"gray",
        textAlign:"center",
        fontSize:15
    },
    personContainer:{
        margin:15,
        marginTop:20,
        backgroundColor:"#777775",
        padding:20,
        borderRadius:40,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    personDetails:{
        borderRightWidth:1,
        borderColor:"white",
        paddingRight:5
    },
    detailText:{
        color:"white"
    },
    personDetailText:{
        color:"lightgray"
    },
    biographyContainer:{
        margin:10,
        marginLeft:18
    },
    biographyHeading:{
        color:"white",
        fontSize:20,
        paddingVertical:10
    }
});

export default PersonScreen;