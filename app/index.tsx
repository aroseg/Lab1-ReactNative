export interface Task {
    id: string;
    title: string;
    status: boolean;
  }
  
  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  
  const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
  
    const addTask = () => {
      if (title.trim()) {
        const id = new Date().toISOString();
        setTasks([...tasks, { id, title, status: false }]);
        setTitle('');
      }
    };
  
    const toggleStatus = (id: string) => {
      setTasks(tasks.map(task => task.id === id ? { ...task, status: !task.status } : task));
    };
  
    const deleteTask = (id: string) => {
      setTasks(tasks.filter(task => task.id !== id));
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity
            style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
            onPress={addTask}
            disabled={!title.trim()}
          >
            <Ionicons name="add-circle" size={40} color={title.trim() ? "#4CAF50" : "#CCC"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <Text style={[styles.taskTitle, item.status && styles.taskDone]}>{item.title}</Text>
              <Switch
                value={item.status}
                onValueChange={() => toggleStatus(item.id)}
              />
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    addButton: {
      marginLeft: 10,
    },
    addButtonDisabled: {
      opacity: 0.5,
    },
    task: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      elevation: 1,
    },
    taskTitle: {
      flex: 1,
      fontSize: 16,
    },
    taskDone: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
  });
  
  export default App;
  