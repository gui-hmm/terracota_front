import { 
    ContainerProdutos, 
    ContainerProdutosGeral, 
    ImageProduto, 
    ProdutoName,
    ProdutoValor} from "./produtosComponentStyle";
import P1 from "../../assets/p1.png"
import P2 from "../../assets/p2.png"
import P3 from "../../assets/p3.png"
import P4 from "../../assets/p4.png"
import P5 from "../../assets/p5.png"
import P6 from "../../assets/p6.png"
import P7 from "../../assets/p7.png"
import P8 from "../../assets/p8.png"
import P9 from "../../assets/p9.png"
import P10 from "../../assets/p10.png"
import P11 from "../../assets/p11.png"
import P12 from "../../assets/p12.png"
import Voltar from "../../assets/menorQue.png"

function ProdutosComponent(){
    return(
        <div>
            <>
                <ContainerProdutosGeral>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P1} />
                        <ProdutoName>Vasos de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 160,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P2} />
                        <ProdutoName>Panela de barro</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P3} />
                        <ProdutoName>Estatueta de terracota</ProdutoName>
                        <ProdutoValor>R$ 350,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P4} />
                        <ProdutoName>Caldeirão de barro</ProdutoName>
                        <ProdutoValor>R$ 160,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P5} />
                        <ProdutoName>Potes de barro</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P6} />
                        <ProdutoName>Tigelas de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P7} />
                        <ProdutoName>Leão de barro</ProdutoName>
                        <ProdutoValor>R$ 300,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P8} />
                        <ProdutoName>Cervos de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 500,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P9} />
                        <ProdutoName>São Francisco</ProdutoName>
                        <ProdutoValor>R$ 250,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P10} />
                        <ProdutoName>Jarra de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 150,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P11} />
                        <ProdutoName>Cisnes de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 200,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P12} />
                        <ProdutoName>Coelho de barro</ProdutoName>
                        <ProdutoValor>R$ 130,00</ProdutoValor>
                    </ContainerProdutos>
                </ContainerProdutosGeral>
            </>
        </div>
    )
}
export default ProdutosComponent;