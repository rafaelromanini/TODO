import React, { useState, useEffect } from "react";
import axios from "axios";
import TargetList from "./components/targets/TargetList";
import TodoList from "./components/todolist/TodoList";
import TargetForm from "./components/forms/TargetForm";
import TodoForm from "./components/forms/TodoForm";
import "./index.css";

const baseUrl = "https://todo-caio.azurewebsites.net/api/";

interface Target {
  id: number;
  title: string;
  description: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number;
}

const App: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([
    { id: 1, title: "Meta 1", description: "Descrição da Meta 1" },
    { id: 2, title: "Meta 2", description: "Descrição da Meta 2" },
  ]);
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  // Função para pegar todos os Targets
  const getTargets = async () => {
    try {
      const response = await axios.get(`${baseUrl}Targets`);
      setTargets(response.data);
    } catch (error) {
      console.error("Erro ao buscar targets:", error);
    }
  };

  // Função para pegar os TODOs de um Target específico
  const getTodosByTarget = async (targetId: number) => {
    try {
      const response = await axios.get(`${baseUrl}Todo?targetId=${targetId}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar todos:", error);
    }
  };

  // Função que seleciona um Target e busca seus TODOs
  const selectTarget = (targetId: number) => {
    setSelectedTargetId(targetId);
    getTodosByTarget(targetId);
  };

  // Efeito para carregar os Targets assim que o componente é montado
  useEffect(() => {
    getTargets();
  }, []);

  const handleEditTodo = (
    todoId: number,
    newTitle: string,
    newDescription: string
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      )
    );
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const handleEditTarget = (
    targetId: number,
    newTitle: string,
    newDescription: string
  ) => {
    setTargets((prevTargets) =>
      prevTargets.map((target) =>
        target.id === targetId
          ? { ...target, title: newTitle, description: newDescription }
          : target
      )
    );
  };

  // Função para excluir um target e seus TODOs
  const handleDeleteTarget = (targetId: number) => {
    // Remove o target da lista
    setTargets((prevTargets) =>
      prevTargets.filter((target) => target.id !== targetId)
    );

    // Remove os TODOs que estão associados a esse target
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.targetId !== targetId)
    );
  };

  // Função para cancelar a criação de TODOs
  const handleCancel = () => {
    setSelectedTargetId(null); // Limpa a seleção do Target
  };

  return (
    <div>
      <h1>Targets e TODOs</h1>

      {/* Formulário para adicionar novos Targets */}
      <TargetForm refreshTargets={getTargets} />

      {/* Lista de Targets */}
      <TargetList
        targets={targets}
        onSelect={selectTarget}
        onEdit={handleEditTarget}
        onDelete={handleDeleteTarget}
      />

      {/* Exibe a lista de TODOs apenas se um Target for selecionado */}
      {selectedTargetId !== null && (
        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      )}
      
      {/* Formulário para adicionar TODOs se um Target estiver selecionado */}
      {selectedTargetId && (
        <TodoForm
          targetId={selectedTargetId}
          refreshTodos={() => getTodosByTarget(selectedTargetId)}
          onCancel={handleCancel} // Passa a função de cancelamento
        />
      )}
    </div>
  );
};

export default App;
