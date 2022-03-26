import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, FlatList, Button } from "react-native";
import { useState } from "react";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

//Can download android studio to emulate android in local machine
//Or xcode to emulate IOS, FORGET IT not available for linux and windows

//In FlatList the content is lazy loaded, better for long list that the ScrollView

//Also FlatList does not need the map
//FlatList looks for a key prop automaticaly , so if you set in the object is all done
//Also you can pass other things as keys.. keyExtractor prop

export default function App() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addGoal = (input) => {
    setGoals((prevGoals) => {
      return [...prevGoals, { text: input, id: Math.random().toString() }];
    });
  };

  const deleteGoal = (id) => {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  };

  const handleModal = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add new goal" color="#5e0acc" onPress={handleModal} />
        <GoalInput
          onAddGoal={addGoal}
          showModal={showModal}
          onCloseModal={handleModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteGoal={deleteGoal}
                />
              );
            }}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },

  goalsContainer: {
    paddingTop: 20,
    flex: 5,
  },
});
