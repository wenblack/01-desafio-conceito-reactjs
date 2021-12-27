import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    //Argumento que não permite criar a task vazia
    if (!newTaskTitle) return;
    //Criando variavel Data para criar ID aleatório
    let hour = new Date();
    //Criando objeto com dados da nova task
    const newTask = {
      id: hour.getTime(),
      //Recebendo titulo do ipunt estado {newTaskTitle}
      title: newTaskTitle,
      //Setando nova tarefa como não concluída
      isComplete: false
    }
    //verificando último estado e salvando novo.
    setTasks(oldState => [...oldState, newTask]);
    //zerando o input após enviar 
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    setTasks(newTask)

  }

  function handleRemoveTask(id: number) {
    //Filtrando a task clicada por exibir no estado todas as tasks com ID diferente. 
    const FilteredTasks = tasks.filter(task => task.id != id)
    setTasks(FilteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}