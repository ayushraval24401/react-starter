import React from 'react';
import styles from './SettingsModal.module.scss';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          ✖
        </button>
        <h2>Settings</h2>
        <p>Here you can manage your settings.</p>
      </div>
    </div>
  );
};

export default SettingsModal;
