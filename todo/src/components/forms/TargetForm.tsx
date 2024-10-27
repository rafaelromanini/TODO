import React, { useState } from 'react';
import axios from 'axios';
import styles from './TargetForm.module.css';

interface TargetFormProps {
    refreshTargets: () => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ refreshTargets }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false); // Controla se o formulário está visível

    // URL base da API
    const baseUrl = 'https://todo-caio.azurewebsites.net/api/';

    const createTarget = async () => {
        try {
            await axios.post(`${baseUrl}Targets`, {
                title,
                description,
                isComplete: false,
            });
            refreshTargets();
            setTitle(''); 
            setDescription(''); 
            setIsFormVisible(false); // Esconde o formulário após criação do target
        } catch (error) {
            console.error('Erro ao criar target:', error);
        }
    };

    return (
        <div className={styles.targetContainer}>
            {!isFormVisible ? (
                <button className={styles.targetButton} onClick={() => setIsFormVisible(true)}>
                    Criar Target
                </button>
            ) : (
                <div className={styles.formWrapper}>
                    <h3 className={styles.formWrapperTitle}>Criar Target</h3>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className={styles.formButton} onClick={createTarget}>Enviar Target</button>
                    <button className={`${styles.formButton} ${styles.secondaryButton}`} onClick={() => setIsFormVisible(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default TargetForm;
