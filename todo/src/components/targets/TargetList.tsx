import React, { useState } from 'react';
import styles from './TargetList.module.css';
import trash from '../../assets/trash.svg';
import pencil from '../../assets/pencil.svg';

interface Target {
  id: number;
  title: string;
  description: string;
}

interface TargetListProps {
  targets: Target[];
  onSelect: (targetId: number) => void;
  onEdit: (targetId: number, newTitle: string, newDescription: string) => void;
  onDelete: (targetId: number) => void;
}

const TargetList: React.FC<TargetListProps> = ({ targets, onSelect, onEdit, onDelete }) => {
  const [editingTargetId, setEditingTargetId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleEditTarget = (target: Target) => {
    setEditingTargetId(target.id);
    setNewTitle(target.title);
    setNewDescription(target.description);
  };

  const handleSaveEdit = (targetId: number) => {
    if (newTitle.trim() && newDescription.trim()) {
      onEdit(targetId, newTitle, newDescription);
      setEditingTargetId(null);
      setNewTitle('');
      setNewDescription('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista Targets</h2>
      <ul className={styles.list}>
        {targets.map((target) => (
          <li key={target.id} className={styles['list-item']}>
            {editingTargetId === target.id ? (
              <div className={styles.content}>
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
                <div className={styles.editButtons}>
                  <button className={styles.saveButton} onClick={() => handleSaveEdit(target.id)}>
                    Salvar
                  </button>
                  <button className={styles.cancelButton} onClick={() => setEditingTargetId(null)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.content}>
                  <span className={styles.target}>Title: {target.title}</span>
                  <p className={styles.description}>Description: {target.description}</p>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.iconButton} onClick={() => onSelect(target.id)}>
                    TODOs
                  </button>
                  <button className={styles.iconButton} onClick={() => handleEditTarget(target)}>
                    <img src={pencil} alt="Editar" className={styles.icon} />
                  </button>
                  <button className={styles.iconButton} onClick={() => onDelete(target.id)}>
                    <img src={trash} alt="Excluir" className={styles.icon} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetList;
