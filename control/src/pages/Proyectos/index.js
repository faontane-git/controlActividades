import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import NavBar from '../NavBar/Navbar';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Roboto', sans-serif;
  padding-top: 80px;
`;

const NavBarContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  padding: 0.5rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    margin-right: 0.5rem;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #2563eb;
  }

  svg {
    margin-right: 0.5rem;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h2`
  font-size: 1.25rem;
  color: #1f2937;
  margin: 0;
`;

const ProjectStatus = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${props => {
    switch (props.status) {
      case 'completed':
        return '#d1fae5';
      case 'in-progress':
        return '#fef3c7';
      case 'not-started':
        return '#fee2e2';
      default:
        return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed':
        return '#065f46';
      case 'in-progress':
        return '#92400e';
      case 'not-started':
        return '#991b1b';
      default:
        return '#4b5563';
    }
  }};
`;

const ProjectDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 0.8rem;
`;

const ProjectDates = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectDate = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.25rem;
  }
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d1d5db;
  }

  svg {
    margin-left: 0.5rem;
  }
`;

// Spinner de carga
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Spinner = styled.div`
  border: 6px solid #e5e7eb;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProjectsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/proyectos`, {
          headers: {
            apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || project.estado === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle />;
      case 'in-progress':
        return <FaClock />;
      case 'not-started':
        return <FaExclamationTriangle />;
      default:
        return null;
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En progreso';
      case 'not-started':
        return 'No iniciado';
      default:
        return 'Desconocido';
    }
  };

  const handleViewProject = projectId => {
    navigate(`/proyectos/${projectId}`);
  };

  const handleAddProject = () => {
    navigate('/proyectos/nuevo');
  };

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>

      <ContentContainer>
        <Header>
          <Title>Mis Proyectos</Title>
          <Actions>
            <SearchFilterContainer>
              <SearchContainer>
                <FaSearch />
                <SearchInput
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </SearchContainer>
              <FilterButton>
                <FaFilter /> Filtros
              </FilterButton>
            </SearchFilterContainer>
            <AddButton onClick={handleAddProject}>
              <FaPlus /> Nuevo Proyecto
            </AddButton>
          </Actions>
        </Header>

        <ProjectsGrid>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} onClick={() => handleViewProject(project.id)}>
              <ProjectHeader>
                <ProjectTitle>{project.nombre}</ProjectTitle>
                <ProjectStatus status={project.estado}>
                  {getStatusIcon(project.estado)} {getStatusText(project.estado)}
                </ProjectStatus>
              </ProjectHeader>
              <ProjectDescription>{project.descripcion}</ProjectDescription>
              <ProjectMeta>
                <ProjectDates>
                  <ProjectDate>
                    <FaClock /> Inicio:{' '}
                    {project.fechainicio
                      ? new Date(project.fechainicio).toLocaleDateString()
                      : '-'}
                  </ProjectDate>
                  <ProjectDate>
                    <FaCheckCircle /> Fin:{' '}
                    {project.fechafin
                      ? new Date(project.fechafin).toLocaleDateString()
                      : '-'}
                  </ProjectDate>
                </ProjectDates>
                <ViewButton>
                  Ver <FaArrowRight />
                </ViewButton>
              </ProjectMeta>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentContainer>
    </Container>
  );
};

export default ProjectsList;
