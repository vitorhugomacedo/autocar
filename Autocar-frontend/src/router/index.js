import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import AppSuperAdminLayout from '@/layout/superadmin/AppLayout.vue';

const UserType = {
  Empresa: 0,
  Afiliado: 1
}

const createMeta = (requiredAuth, type) => {
  return {
    requiresAuth: false,
    type: type
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/cadastros/pessoas',
          name: 'pessoas',
          component: () => import('@/views/pages/cadastros/pessoas/PessoaLista.vue')
        },
        {
          path: '/cadastros/pessoas/novo',
          name: 'pessoasNovo',
          component: () => import('@/views/pages/cadastros/pessoas/PessoaCadastro.vue')
        },
        {
          path: '/cadastros/veiculos',
          name: 'veiculos',
          component: () => import('@/views/pages/cadastros/veiculos/VeiculoLista.vue')
        },
        {
          path: '/cadastros/veiculos/novo',
          name: 'veiculosNovo',
          component: () => import('@/views/pages/cadastros/veiculos/VeiculoCadastro.vue')
        },
        {
          path: '/cadastros/veiculos/editar/:id',
          name: 'veiculosEditar',
          component: () => import('@/views/pages/cadastros/veiculos/VeiculoCadastro.vue')
        },
        {
          path: '/cadastros/tipos-veiculos',
          name: 'tiposVeiculos',
          component: () => import('@/views/pages/cadastros/tipoVeiculo/TipoVeiculoLista.vue')
        },
        {
          path: '/cadastros/tipos-veiculos/novo',
          name: 'tiposVeiculosNovo',
          component: () => import('@/views/pages/cadastros/tipoVeiculo/TipoVeiculoCadastro.vue')
        },
        {
          path: '/cadastros/tipos-veiculos/editar/:id',
          name: 'tiposVeiculosEditar',
          component: () => import('@/views/pages/cadastros/tipoVeiculo/TipoVeiculoCadastro.vue')
        },
        {
          path: '/cadastros/marcas',
          name: 'marcas',
          component: () => import('@/views/pages/cadastros/marca/MarcaLista.vue')
        },
        {
          path: '/cadastros/marcas/novo',
          name: 'marcasNovo',
          component: () => import('@/views/pages/cadastros/marca/MarcaCadastro.vue')
        },
        {
          path: '/cadastros/marcas/editar/:id',
          name: 'marcasEditar',
          component: () => import('@/views/pages/cadastros/marca/MarcaCadastro.vue')
        },
        {
          path: '/cadastros/modelos',
          name: 'modelos',
          component: () => import('@/views/pages/cadastros/modelo/ModeloLista.vue')
        },
        {
          path: '/cadastros/modelos/novo',
          name: 'modelosNovo',
          component: () => import('@/views/pages/cadastros/modelo/ModeloCadastro.vue')
        },
        {
          path: '/cadastros/modelos/editar/:id',
          name: 'modelosEditar',
          component: () => import('@/views/pages/cadastros/modelo/ModeloCadastro.vue')
        },
        {
          path: '/cadastros/itens-adicionais',
          name: 'itensAdicionais',
          component: () => import('@/views/pages/cadastros/itemAdicional/ItemAdicionalLista.vue')
        },
        {
          path: '/cadastros/itens-adicionais/novo',
          name: 'itensAdicionaisNovo',
          component: () => import('@/views/pages/cadastros/itemAdicional/ItemAdicionalCadastro.vue')
        },
        {
          path: '/cadastros/itens-adicionais/editar/:id',
          name: 'itensAdicionaisEditar',
          component: () => import('@/views/pages/cadastros/itemAdicional/ItemAdicionalCadastro.vue')
        },
        {
          path: '/cadastros/combustiveis',
          name: 'combustiveis',
          component: () => import('@/views/pages/cadastros/combustivel/CombustivelLista.vue')
        },
        {
          path: '/cadastros/combustiveis/novo',
          name: 'combustiveisNovo',
          component: () => import('@/views/pages/cadastros/combustivel/CombustivelCadastro.vue')
        },
        {
          path: '/cadastros/combustiveis/editar/:id',
          name: 'combustiveisEditar',
          component: () => import('@/views/pages/cadastros/combustivel/CombustivelCadastro.vue')
        },
        {
          path: '/financeiro/cadastros/tipo-carteira',
          name: 'tipoCarteira',
          component: () => import('@/views/pages/cadastros/tipoCarteira/TipoCarteiraLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/tipo-carteira/novo',
          name: 'tipoCarteiraNovo',
          component: () => import('@/views/pages/cadastros/tipoCarteira/TipoCarteiraCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/tipo-carteira/editar/:id',
          name: 'tipoCarteiraEditar',
          component: () => import('@/views/pages/cadastros/tipoCarteira/TipoCarteiraCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/carteira',
          name: 'carteira',
          component: () => import('@/views/pages/cadastros/carteira/CarteiraLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/carteira/novo',
          name: 'carteiraNovo',
          component: () => import('@/views/pages/cadastros/carteira/CarteiraCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/carteira/editar/:id',
          name: 'carteiraEditar',
          component: () => import('@/views/pages/cadastros/carteira/CarteiraCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/grupo-contabil',
          name: 'grupoContabil',
          component: () => import('@/views/pages/cadastros/grupoContabil/GrupoContabilLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/grupo-contabil/novo',
          name: 'grupoContabilNovo',
          component: () => import('@/views/pages/cadastros/grupoContabil/GrupoContabilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/grupo-contabil/editar/:id',
          name: 'grupoContabilEditar',
          component: () => import('@/views/pages/cadastros/grupoContabil/GrupoContabilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/conta-contabil',
          name: 'contaContabil',
          component: () => import('@/views/pages/cadastros/contaContabil/ContaContabilLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/conta-contabil/novo',
          name: 'contaContabilNovo',
          component: () => import('@/views/pages/cadastros/contaContabil/ContaContabilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/financeiro/cadastros/conta-contabil/editar/:id',
          name: 'contaContabilEditar',
          component: () => import('@/views/pages/cadastros/contaContabil/ContaContabilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/usuarios',
          name: 'usuarioLista',
          component: () => import('@/views/pages/configuracoes/usuarios/UsuarioLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/usuarios/novo',
          name: 'usuarioNovo',
          component: () => import('@/views/pages/configuracoes/usuarios/UsuarioCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/usuarios/editar/:id',
          name: 'usuarioEditar',
          component: () => import('@/views/pages/configuracoes/usuarios/UsuarioCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/usuario-configuracao',
          name: 'usuarioConfiguracao',
          component: () => import('@/views/pages/configuracoes/usuarioConfiguracao/UsuarioConfiguracao.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/perfil-usuario/',
          name: 'usuarioPerfilLista',
          component: () => import('@/views/pages/configuracoes/usuariosPerfil/UsuarioPerfilLista.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/perfil-usuario/novo',
          name: 'usuarioPerfilNovo',
          component: () => import('@/views/pages/configuracoes/usuariosPerfil/UsuarioPerfilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
        {
          path: '/configuracoes/perfil-usuario/editar/:id',
          name: 'usuarioPerfilEditar',
          component: () => import('@/views/pages/configuracoes/usuariosPerfil/UsuarioPerfilCadastro.vue'),
          meta: createMeta(true, UserType.Empresa)
        },
      ]
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/pages/Landing.vue')
    },
    {
      path: '/pages/notfound',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/cadastrar-senha',
      name: 'cadastrarsenha',
      component: () => import('@/views/pages/auth/CadastrarSenha.vue')
    },
    {
      path: '/access',
      name: 'accessDenied',
      component: () => import('@/views/pages/auth/Access.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/pages/auth/Error.vue')
    },
    {
      path: '/superadmin',
      component: AppSuperAdminLayout,
      meta: createMeta(true, UserType.Afiliado),
      children: [
        {
          path: '/',
          name: '/superadmin/dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: createMeta(true, UserType.Afiliado)
        },
        {
          path: '/superadmin/cadastros/empresas',
          name: 'empresas',
          component: () => import('@/views/pages/cadastros/empresas/EmpresaLista.vue'),
          meta: createMeta(true, UserType.Afiliado)
        },
        {
          path: '/superadmin/cadastros/empresas/novo',
          name: 'empresasnovo',
          component: () => import('@/views/pages/cadastros/empresas/EmpresaCadastro.vue')
        },
        {
          path: '/superadmin/cadastros/empresas/editar/:id',
          name: 'empresaseditar',
          component: () => import('@/views/pages/cadastros/empresas/EmpresaCadastro.vue')
        },
      ]
    },
  ]
});

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
    window.location = to.fullPath
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('auth');
    if (token) {
      const auth = JSON.parse(token);
      if (to.path == "/" && auth.tipoUsuario == UserType.Afiliado) {
        next('/superadmin');
        return;
      }

      if (to.meta.type == undefined || auth.tipoUsuario == to.meta.type) {
        next();
      } else {
        next('/login');
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
