import axios from "axios"

export async function profilePhoto(dados){
    try {
        const response = await axios.post('/api/photoprofile', { id: dados.id } );
        const updatedUser = response.data;
        return updatedUser
     } catch (error) {
       console.error('Erro ao carregar perfil de usuário:', error);
     }
}