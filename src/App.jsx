import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar, Nav } from 'react-bootstrap';
import './styles.css'; // Archivo CSS para estilos personalizados

function App() {
  // Estados para el formulario de agregar tarea
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para las metas alcanzadas
  const [completedTasks, setCompletedTasks] = useState([]);

  // Función para agregar una nueva tarea
  const handleAddTask = () => {
    if (taskName && description && deadline) {
      const newTask = { name: taskName, description: description, deadline: deadline };
      setTasks([...tasks, newTask]);
      // Limpiar campos después de agregar tarea
      setTaskName('');
      setDescription('');
      setDeadline('');
    }
  };

  // Función para marcar una tarea como completada
  const handleCompleteTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      {/* Navbar fija en la parte superior de la pantalla */}
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#">To-Do List App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Enlaces a las secciones */}
            <a href="#agregar-tarea" className="nav-link">Agregar Tarea</a>
            <a href="#tareas-pendientes" className="nav-link">Tareas Pendientes</a>
            <a href="#metas-alcanzadas" className="nav-link">Metas Alcanzadas</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Contenido principal de la aplicación */}
      <Container fluid className="main-container">
        <Row>
          <Col md={6}>
            {/* Sección de Agregar Tarea */}
            <h2 id="agregar-tarea" className="text-center mt-4 mb-4">Agregar Tarea</h2>
            {/* Formulario para agregar tarea */}
            <Form>
              <Form.Group controlId="taskName">
                <Form.Label>Nombre de la Tarea</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="deadline">
                <Form.Label>Fecha de Finalización</Form.Label>
                <Form.Control
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddTask}>
                Agregar Tarea
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            {/* Sección de Tareas Pendientes */}
            <h2 className="text-center mt-4 mb-4">Tareas Pendientes</h2>
            {/* Lista de tareas pendientes */}
            <ListGroup>
              {tasks.map((task, index) => (
                <ListGroup.Item key={index}>
                  <h6>Nombre de la tarea</h6>
                  <p>{task.name}</p>
                  <h6>descripción</h6>
                  <p>{task.description}</p>
                  <h6>Fecha de Finalización:</h6>
                  <p>{task.deadline}</p>
                  <Button variant="success" onClick={() => handleCompleteTask(index)}>
                    Completar
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteTask(index)}>
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            {/* Sección de Metas Alcanzadas */}
            <h2 className="text-center mt-4 mb-4">Metas Alcanzadas</h2>
            {/* Lista de metas alcanzadas */}
            <ListGroup>
              {completedTasks.map((task, index) => (
                <ListGroup.Item key={index}>
                  <h6>Nombre de la tarea</h6>
                  <p>{task.name}</p>
                  <h6>descripción</h6>
                  <p>{task.description}</p>
                  <h6>Fecha de Finalización:</h6>
                  <p>{task.deadline}</p>
                  <Button variant="secondary" disabled>
                    Completado
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
