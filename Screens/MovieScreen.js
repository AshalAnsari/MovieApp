import { useNavigation, useRoute } from '@react-navigation/native';
import React , { useEffect, useState } from 'react';
import { View , StyleSheet , Text, ScrollView, SafeAreaView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CastMembers from '../Component/CastMembers';
import MovieList from '../Component/MovieList';
import Loading from '../Component/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var {width, height} = Dimensions.get("window")
const ios = Platform.OS === "ios";
const topMargin = ios? '': 3;

function MovieScreen(props) {
    const {params: item} = useRoute();
    const [ cast , setCast ] = useState([]);
    const [similarMovies , setSimilarMovies] = useState([])
    const [isFavourite , setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    },[item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if(data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if(data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if(data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom:20 , backgroundColor: "rgba(0,0,0,0.9)"}}  
        >
            <View style={{width:"100%"}}>
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
                    :<>
                    <View>
                        <Image
                            // source={require("../assets/TheBatman.png")}
                            source={{uri: image500(movie?.poster_path)}}
                            style={{
                                height:height*0.55,
                                width
                            }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                            style={{width, height:height*0.3, position:"absolute",bottom:0}}
                            start={{x: 0.5 , y: 0}}
                            end={{x: 0.5 , y: 1}}
                        />
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.text}>{movie?.title}</Text>

                        {
                            movie?.id?(
                                <View style={styles.statusContainer}>
                                    <Text style={styles.detailText}>{movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min</Text>
                                </View>
                            ): null
                        }

                        <View style={styles.genreContainer}>
                            {movie?.genres?.map((genre, index) => {
                                let showDot = index+1 != movie?.genres.length;
                                return (
                                    <Text style={styles.detailText}>{genre?.name} {showDot? '.' : null} </Text>
                                )
                            })}
                        </View>
                            
                        <Text style={[styles.detailText, {margin:10}]}>{movie.overview}</Text>
                    </View>

                    {cast.length>0 && <CastMembers navigation={navigation} cast={cast}/>}

                    {similarMovies.length>0 && <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true}/>}
                    </>
                }          
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:4,
        zIndex:20,
        marginTop:{topMargin},
    },
    detailsContainer:{
        marginTop:-(height*0.07),
    },
    text:{
        color:"white",
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
    },
    statusContainer:{
        justifyContent:"center",
        flexDirection:"row",
        marginVertical:10,
    },
    genreContainer:{
        justifyContent:"center",
        flexDirection:"row",
        marginHorizontal:4,
    },
    detailText:{
        color:"#777777",
    }
});

export default MovieScreen;