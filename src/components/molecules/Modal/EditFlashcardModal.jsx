import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../../atoms/Button';
import { useApi } from '../../../hooks/useApi';

const EditFlashcardModal = ({
                                isOpen = false,
                                onClose,
                                flashcard = null,
                                categories = [],
                                onFlashcardUpdated
                            }) => {
    const api = useApi();
    const [formData, setFormData] = useState({
        pregunta: '',
        respuesta: '',
        imagen: '',
        url: '',
        selectedCategories: []
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Cargar datos cuando se abre el modal
    useEffect(() => {
        if (isOpen && flashcard) {
            setFormData({
                pregunta: flashcard.pregunta || '',
                respuesta: flashcard.respuesta || '',
                imagen: flashcard.imagen || '',
                url: flashcard.url || '',
                selectedCategories: flashcard.categories?.map(cat => cat.id) || []
            });
            setErrors({});
        }
    }, [isOpen, flashcard]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!flashcard) return;

        // Validación básica
        const newErrors = {};
        if (!formData.pregunta.trim()) {
            newErrors.pregunta = 'La pregunta es obligatoria';
        }
        if (!formData.respuesta.trim()) {
            newErrors.respuesta = 'La respuesta es obligatoria';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const result = await api.put(`/api/flashcard/${flashcard.id}`, {
                pregunta: formData.pregunta,
                respuesta: formData.respuesta,
                url: formData.url,
                categories: formData.selectedCategories
            });

            if (result.success) {
                onFlashcardUpdated?.(result.data.flashcard);
                onClose();
            } else {
                setErrors({ general: result.error || 'Error al actualizar la flashcard' });
            }
        } catch (error) {
            console.error('Error updating flashcard:', error);
            setErrors({ general: 'Error de conexión. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCategoryChange = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(categoryId)
                ? prev.selectedCategories.filter(id => id !== categoryId)
                : [...prev.selectedCategories, categoryId]
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Flashcard"
            size="large"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error general */}
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-sm text-red-800">{errors.general}</p>
                    </div>
                )}

                {/* Pregunta */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pregunta *
                    </label>
                    <textarea
                        name="pregunta"
                        value={formData.pregunta}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.pregunta ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Escribe tu pregunta aquí..."
                    />
                    {errors.pregunta && (
                        <p className="text-sm text-red-600 mt-1">{errors.pregunta}</p>
                    )}
                </div>

                {/* Respuesta */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Respuesta *
                    </label>
                    <textarea
                        name="respuesta"
                        value={formData.respuesta}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.respuesta ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Escribe tu respuesta aquí..."
                    />
                    {errors.respuesta && (
                        <p className="text-sm text-red-600 mt-1">{errors.respuesta}</p>
                    )}
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditFlashcardModal;
