import React, { useState } from 'react';
import axios from 'axios';
import styles from './TodoForm.module.css';

interface TodoFormProps {
    targetId: number;
    refreshTodos: () => void;
    onCancel: () => void; 
}

const TodoForm: React.FC<TodoFormProps> = ({ targetId, refreshTodos, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const baseUrl = 'https://todo-caio.azurewebsites.net/api/';

    const createTodo = async () => {
        if (!title || !description) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        try {
            await axios.post(`${baseUrl}Todo`, {
                title,
                description,
                isComplete: false,
                targetId,
            });
            refreshTodos();
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Erro ao criar todo:', error);
        }
    };

    const handleCancel = () => {
        setTitle(''); 
        setDescription(''); 
        onCancel(); 
    };

    return (
        <div className={styles.todoFormContainer}>
            <h3 className={styles.todoFormTitle}>Criar TODO para o Target</h3>
            <input
                className={styles.todoFormInput}
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className={styles.todoFormInput}
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.buttonContainer}>
                <button className={styles.todoFormButton} onClick={createTodo}>Criar TODO</button>
                <button className={styles.cancelButton} onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default TodoForm;
