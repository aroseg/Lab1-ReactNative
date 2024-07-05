import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseconfig';
import { Task } from './Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const tasksRef = collection(FIREBASE_DB, 'tasks');
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasksData: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Task));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (title.trim()) {
      try {
        await addDoc(collection(FIREBASE_DB, 'tasks'), {
          title,
          status: false,
        });
        setTitle('');
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    }
  };

  const toggleStatus = async (id: string) => {
    const taskRef = doc(FIREBASE_DB, `tasks/${id}`);
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        await updateDoc(taskRef, { status: !task.status });
      } catch (error) {
        console.error('Error updating task: ', error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    const taskRef = doc(FIREBASE_DB, `tasks/${id}`);
    try {
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
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
