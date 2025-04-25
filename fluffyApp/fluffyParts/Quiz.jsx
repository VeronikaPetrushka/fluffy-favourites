import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import quiz from '../fluffyConstants/quiz';

const { height } = Dimensions.get('window');

const Quiz = () => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [finished, started]);

    const handleReply = () => {
        if(selectedOption) {
            if(selectedOption === quiz[currentQuestionIndex].correct) {
                setCorrect((prev) => prev + 1);
            } else {
                setIncorrect((prev) => prev + 1);
            }
        }

        setSelectedOption(null);

        if(currentQuestionIndex === quiz.length - 1) {
            setFinished(true);
            setKey((prev) => prev + 1);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleRetry = () => {
        setFinished(false);
        setCurrentQuestionIndex(0);
        setCorrect(0);
        setIncorrect(0);
        setSelectedOption(null);
        setKey((prev) => prev + 1);
    };

    const handleGoBack = () => {
        setFinished(false);
        setStarted(false);
        setCurrentQuestionIndex(0);
        setCorrect(0);
        setIncorrect(0);
        setSelectedOption(null);
        setKey((prev) => prev + 1);
    };

    return (
        <View style={styles.container}>

            {
                started ? (
                    <View style={{width: '100%', flexGrow: 1}}>
                        {
                            finished ? (
                                <View style={{width: '100%', alignItems: 'center', marginVertical: 'auto'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 40}}>
                                        <View style={[styles.countContainer, {marginRight: 6}]}>
                                            <Text style={styles.countText}>CORRECT</Text>
                                            <Text style={styles.count}>{correct } / {quiz.length}</Text>
                                        </View>
                                        <View style={styles.countContainer}>
                                            <Text style={styles.countText}>INCORRECT</Text>
                                            <Text style={styles.count}>{incorrect} / {quiz.length}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={handleRetry}>
                                            <Image source={require('../appAssets/decor/retry.png')} style={{width: 105, height: 105, resizeMode: 'contain', marginRight: 10}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleGoBack}>
                                            <Image source={require('../appAssets/decor/home.png')} style={{width: 105, height: 105, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
                                    <Text style={[styles.count, {color: '#fff', marginBottom: height * 0.03}]}>{currentQuestionIndex}/{quiz.length}</Text>
                                    <View style={styles.questionContainer}>
                                        <Text style={styles.question}>{quiz[currentQuestionIndex].question}</Text>
                                    </View>
                                    {
                                        quiz[currentQuestionIndex].options.map((option, index) => (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={[styles.optionBtn, selectedOption === option && {borderColor: '#ff8fe1'}]} 
                                                onPress={() => setSelectedOption(option)}
                                                >
                                                    <View style={styles.optionLetterBox}>
                                                        <Text style={styles.optionLetter}>{index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}</Text>
                                                    </View>
                                                <Text style={styles.optionText}>{option}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            )
                        }

                    </View>
                ) : (
                    <View style={{marginTop: height * 0.1, alignItems: 'center'}}>
                        <Text style={styles.title}>Fluffy Pet Care Quiz</Text>
                        <Image source={require('../appAssets/decor/empty.png')} style={{width: 234, height: height * 0.24}} />
                    </View>
                )
            }

            {
                !finished && (
                    <TouchableOpacity 
                        style={[styles.playBtn, (started && !selectedOption) && {backgroundColor: '#939393'}]} 
                        onPress={started ? handleReply : () => setStarted(true)}
                        disabled={started && !selectedOption}
                        >
                        <Text style={styles.playBtnText}>{started ? 'Reply' : 'Play'}</Text>
                    </TouchableOpacity>    
                )
            }

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 45,
        fontWeight: '900', 
        marginBottom: height * 0.052,
        lineHeight: 51,
        color: '#fff',
        textAlign: 'center'
    },

    playBtn: {
        width: 354,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: '#ff8fe1',
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center'
    },

    questionContainer: {
        width: '100%',
        height: height > 700 ? 145 : 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: height > 700 ? 19 : 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.02
    },

    question: {
        color: '#005219',
        textAlign: 'center',
        fontSize: height > 700 ? 25 : 20,
        lineHeight: height > 700 ? 27 : 22,
        fontWeight: '800',
    },

    optionBtn: {
        width: '100%',
        paddingVertical: height > 700 ? 13 : 7,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#fff',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    optionLetterBox: {
        width: height > 700 ? 40 : 30,
        height: height > 700 ? 40 : 30,
        borderRadius: 100,
        backgroundColor: '#ff8fe1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },

    optionLetter: {
        fontSize: 14,
        fontWeight: '800', 
        color: '#fff',
    },

    optionText: {
        fontSize: 16,
        fontWeight: '800', 
        color: '#005219',
    },

    playBtnText: {
        fontSize: 19,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 20,
    },

    countContainer: {
        width: 136,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 5
    },

    countText: {
        fontSize: 15,
        fontWeight: '400', 
        color: '#005219',
    },

    count: {
        fontSize: 30,
        fontWeight: '900', 
        color: '#005219',
    }

});

export default Quiz;