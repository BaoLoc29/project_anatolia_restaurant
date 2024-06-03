import Menu from "../models/menu.js";
import joi from "joi"

const formatCreatedAt = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export const createMenu = async (req, res) => {
    try {
        const { code, name, classify, description, unit, price, discount } = req.body

        const createSchema = joi.object({
            code: joi.string().required().messages({
                'string.empty': 'Mã thực đơn không được để trống'
            }),
            name: joi.string().required().messages({
                'string.empty': 'Tên món ăn không được để trống'
            }),
            classify: joi.string().required().messages({
                'string.empty': 'Phân loại không được để trống'
            }),
            description: joi.string().required().messages({
                'string.empty': 'Mô tả thực đơn không được để trống'
            }),
            unit: joi.string().required().messages({
                'string.empty': 'Đơn vị món không được để trống'
            }),
            price: joi.number().required().messages({
                'number.base': 'Giá món không được để trống'
            }),
            discount: joi.number().required().messages({
                'number.base': 'Giảm giá món không được để trống'
            })
        });

        const { error } = createSchema.validate({ code, name, classify, description, unit, price, discount }, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                error: error.details.map(e => e.message)
            });
        }

        const result = await Menu.create({ code, name, classify, description, unit, price, discount });
        return res.status(200).json({
            message: "Thêm mới món ăn vào thực đơn thành công.",
            menu: {
                ...result.toObject(),
                createdAt: formatCreatedAt(result.createdAt)
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const editMenu = async (req, res) => {
    try {
        const { code, name, classify, description, unit, price, discount } = req.body
        const { id } = req.params
        const editSchema = joi.object({
            code: joi.string().required().messages({
                'string.empty': 'Mã thực đơn không được để trống'
            }),
            name: joi.string().required().messages({
                'string.empty': 'Tên món ăn không được để trống'
            }),
            classify: joi.string().required().messages({
                'string.empty': 'Phân loại không được để trống'
            }),
            description: joi.string().required().messages({
                'string.empty': 'Mô tả thực đơn không được để trống'
            }),
            unit: joi.string().required().messages({
                'string.empty': 'Đơn vị món không được để trống'
            }),
            price: joi.number().required().messages({
                'number.base': 'Giá món không được để trống'
            }),
            discount: joi.number().required().messages({
                'number.base': 'Giảm giá món không được để trống'
            })
        });
        const { error } = editSchema.validate({ code, name, classify, description, unit, price, discount });
        if (error) {
            return res.status(400).json({
                error: error.details.map(e => e.message)
            });
        }

        const updateMenu = await Menu.findByIdAndUpdate(id, { code, name, classify, description, unit, price, discount }, { new: true })

        return res.status(200).json({
            message: "Cập nhật món ăn trong thực đơn thành công.",
            menu: {
                ...updateMenu.toObject(),
                createdAt: formatCreatedAt(updateMenu.createdAt)
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}