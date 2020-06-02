import { Fabricante } from "./fabricante.entity";
import { EntityRepository, Repository } from "typeorm";
import { InsertFabricanteDto, GetFabricanteDto, UpdateFabricanteDto } from "./fabricante.dto";

@EntityRepository(Fabricante)
export class FabricanteRepository extends Repository<Fabricante>{

    async insertFabricante(insertFabricanteDto: InsertFabricanteDto): Promise<Fabricante> {
        const { cnpj, razao_social, nome_fantasia, endereco, ddd, telefone } = insertFabricanteDto;
        const fabricante = new Fabricante();

        fabricante.cnpj = cnpj;
        fabricante.razao_social = razao_social;
        fabricante.nome_fantasia = nome_fantasia;
        fabricante.endereco = endereco;
        fabricante.ddd = ddd;
        fabricante.telefone = telefone;

        return await fabricante.save();
    }

    async getFilteredFabricante(getFabricanteDto: GetFabricanteDto): Promise<Fabricante[]> {
        const { cnpj, razao_social, nome_fantasia, endereco, ddd, telefone } = getFabricanteDto

        const query = this.createQueryBuilder('fabricante');

        if (cnpj) {
            query.andWhere('UPPER(fabricante.cnpj) LIKE UPPER(:search)', { search: `%${cnpj}%` })
        }

        if (razao_social) {
            query.andWhere('UPPER(fabricante.razao_social) LIKE UPPER(:search)', { search: `%${razao_social}%` })
        }

        if (nome_fantasia) {
            query.andWhere('UPPER(fabricante.nome_fantasia) LIKE UPPER(:search)', { search: `%${nome_fantasia}%` })
        }

        if (endereco) {
            query.andWhere('UPPER(fabricante.endereco) LIKE UPPER(:search)', { search: `%${endereco}%` })
        }

        if (ddd) {
            query.andWhere('UPPER(fabricante.ddd) LIKE UPPER(:search)', { search: `%${ddd}%` })
        }

        if (telefone) {
            query.andWhere('UPPER(fabricante.telefone) LIKE UPPER(:search)', { search: `%${telefone}%` })
        }

        query.orderBy('id_fabricante');

        return await query.getMany();

    }

    async updateFabricante(updateFabricanteDto: UpdateFabricanteDto, fabricante: Fabricante): Promise<Fabricante> {
        const { razao_social, nome_fantasia, endereco, ddd, telefone } = updateFabricanteDto

        if (razao_social) {
            fabricante.razao_social = razao_social;
        }

        if (nome_fantasia) {
            fabricante.nome_fantasia = nome_fantasia;
        }

        if (endereco) {
            fabricante.endereco = endereco;
        }

        if (ddd) {
            fabricante.ddd = ddd;
        }

        if (telefone) {
            fabricante.telefone = telefone;
        }

        return await fabricante.save();
    }
}