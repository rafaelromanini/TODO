import React, { useState } from 'react';
import styles from './TodoList.module.css';
import { Todo } from '../../type'; 
import trashIcon from '../../assets/trash.svg';
import editIcon from '../../assets/pencil.svg';

interface TodoListProps {
    todos: Todo[];
    onEdit: (todoId: number, newTitle: string, newDescription: string) => void;
    onDelete: (todoId: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete }) => {
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleEditTodo= (todo: Todo) => {
        setEditingTodoId(todo.id);
        setNewTitle(todo.title);
        setNewDescription(todo.description);
    };

    const handleSaveEdit = (todoId: number) => {
        onEdit(todoId, newTitle, newDescription);
        setEditingTodoId(null); 
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>TODOs</h2>
            <ul className={styles.list}>
                {todos.map((todo) => (
                    <li key={todo.id} className={styles['list-item']}>
                        {editingTodoId === todo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Novo título"
                                />
                                <input
                                    type="text"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Nova descrição"
                                />
                                <button onClick={() => handleSaveEdit(todo.id)}>Salvar</button>
                                <button onClick={() => setEditingTodoId(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                <span><strong>Título: </strong> {todo.title} </span>
                                <span><strong>Descrição: </strong> {todo.description} </span>
                                <button onClick={() => handleEditTodo(todo)} className={styles.iconButton}>
                                    <img src={editIcon} alt="Editar" className={styles.icon} />
                                </button>
                                <button onClick={() => onDelete(todo.id)} className={styles.iconButton}>
                                    <img src={trashIcon} alt="Excluir" className={styles.icon} />
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
