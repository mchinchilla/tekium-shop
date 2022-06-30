import {IProduct} from "../../../interfaces";
import {NextApiRequest, NextApiResponse} from "next";
import {db, SHOP_CONSTANTS} from "../../../database";
import {Product} from "../../../models";

type Data =
    | { message: string }
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':
            return getProductBySlug(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            });
    }
}


const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {slug} = req.query;

    let condition = {};

    if (slug) {
        condition = {slug: slug};
    }

    await db.connect();

    const product = await Product.findOne(condition).lean();

    await db.disconnect();

    if (!product) {
        return res.status(404).json({message: `Slug [${slug}] not found.`});
    }

    return res.status(200).json(product);

}