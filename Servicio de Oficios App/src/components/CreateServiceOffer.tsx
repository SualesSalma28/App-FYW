import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface CreateServiceOfferProps {
  onClose: () => void;
}

export function CreateServiceOffer({ onClose }: CreateServiceOfferProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !description || !location) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    toast.success('¡Servicio publicado exitosamente!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título del Servicio *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Plomero profesional"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Categoría *</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plomero">Plomero</SelectItem>
            <SelectItem value="electricista">Electricista</SelectItem>
            <SelectItem value="pintor">Pintor</SelectItem>
            <SelectItem value="carpintero">Carpintero</SelectItem>
            <SelectItem value="jardinero">Jardinero</SelectItem>
            <SelectItem value="limpieza">Limpieza</SelectItem>
            <SelectItem value="albanil">Albañil</SelectItem>
            <SelectItem value="mecanico">Mecánico</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Descripción del Servicio *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe tu experiencia y servicios..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="location">Ubicación *</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ciudad o zona de servicio"
          required
        />
      </div>

      <div>
        <Label htmlFor="rate">Tarifa por Hora</Label>
        <Input
          id="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Ej: $200/hora"
        />
      </div>

      <div>
        <Label htmlFor="experience">Años de Experiencia</Label>
        <Input
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Ej: 5 años"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
          Publicar
        </Button>
      </div>
    </form>
  );
}
