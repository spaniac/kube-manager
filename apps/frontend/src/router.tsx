import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@layouts/AppLayout';
import ProtectedRoute from '@components/ProtectedRoute';
import Login from '@pages/Login';
import Dashboard from '@pages/Dashboard';
import ClusterOverview from '@pages/ClusterOverview';
import ClusterEvents from '@pages/ClusterEvents';
import ClusterResources from '@pages/ClusterResources';
import ClusterMetricsHistory from '@pages/ClusterMetricsHistory';
import NodeList from '@pages/NodeList';
import NodeDetails from '@pages/NodeDetails';
import NamespaceList from '@pages/NamespaceList';
import NamespaceDetails from '@pages/NamespaceDetails';
import CreateNamespace from '@pages/CreateNamespace';
import EditNamespace from '@pages/EditNamespace';
import NamespaceManagement from '@pages/NamespaceManagement';
import UserProfile from '@pages/UserProfile';
import PodList from '@pages/PodList';
import PodDetails from '@pages/PodDetails';
import DeploymentList from '@pages/DeploymentList';
import DeploymentDetails from '@pages/DeploymentDetails';
import ServiceList from '@pages/ServiceList';
import ConfigMapList from '@pages/ConfigMapList';
import SecretList from '@pages/SecretList';
import StatefulSetList from '@pages/StatefulSetList';
import DaemonSetList from '@pages/DaemonSetList';
import WorkloadCreate from '@pages/WorkloadCreate';
import WorkloadRollback from '@pages/WorkloadRollback';
import WorkloadUpdateStrategy from '@pages/WorkloadUpdateStrategy';
import WorkloadResources from '@pages/WorkloadResources';
import WorkloadEnvEditor from '@pages/WorkloadEnvEditor';
import WorkloadClone from '@pages/WorkloadClone';
import JobList from '@pages/JobList';
import CronJobList from '@pages/CronJobList';
import PdbManagement from '@pages/PdbManagement';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'cluster',
        children: [
          {
            index: true,
            element: <ClusterOverview />,
          },
          {
            path: 'resources',
            element: <ClusterResources />,
          },
          {
            path: 'metrics',
            element: <ClusterMetricsHistory />,
          },
          {
            path: 'events',
            element: <ClusterEvents />,
          },
          {
            path: 'nodes',
            children: [
              {
                index: true,
                element: <NodeList />,
              },
              {
                path: ':name',
                element: <NodeDetails />,
              },
            ],
          },
        ],
      },
      {
        path: 'namespaces',
        children: [
          {
            index: true,
            element: <NamespaceList />,
          },
          {
            path: 'create',
            element: <CreateNamespace />,
          },
          {
            path: ':name/manage',
            element: <NamespaceManagement />,
          },
          {
            path: ':name/edit',
            element: <EditNamespace />,
          },
          {
            path: ':name',
            element: <NamespaceDetails />,
          },
        ],
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: 'pods',
        children: [
          {
            index: true,
            element: <PodList />,
          },
          {
            path: ':namespace/:name',
            element: <PodDetails />,
          },
        ],
      },
      {
        path: 'deployments',
        children: [
          {
            index: true,
            element: <DeploymentList />,
          },
          {
            path: 'create',
            element: <WorkloadCreate />,
          },
          {
            path: ':namespace/:name',
            element: <DeploymentDetails />,
          },
          {
            path: ':namespace/:name/rollback',
            element: <WorkloadRollback />,
          },
          {
            path: ':namespace/:name/strategy',
            element: <WorkloadUpdateStrategy />,
          },
          {
            path: ':namespace/:name/resources',
            element: <WorkloadResources />,
          },
          {
            path: ':namespace/:name/env',
            element: <WorkloadEnvEditor />,
          },
          {
            path: ':namespace/:name/clone',
            element: <WorkloadClone />,
          },
        ],
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobList />,
          },
        ],
      },
      {
        path: 'cronjobs',
        children: [
          {
            index: true,
            element: <CronJobList />,
          },
        ],
      },
      {
        path: 'pdb',
        children: [
          {
            index: true,
            element: <PdbManagement />,
          },
        ],
      },
      {
        path: 'services',
        children: [
          {
            index: true,
            element: <ServiceList />,
          },
        ],
      },
      {
        path: 'configmaps',
        children: [
          {
            index: true,
            element: <ConfigMapList />,
          },
        ],
      },
      {
        path: 'secrets',
        children: [
          {
            index: true,
            element: <SecretList />,
          },
        ],
      },
      {
        path: 'statefulsets',
        children: [
          {
            index: true,
            element: <StatefulSetList />,
          },
        ],
      },
      {
        path: 'daemonsets',
        children: [
          {
            index: true,
            element: <DaemonSetList />,
          },
        ],
      },
    ],
  },
]);
