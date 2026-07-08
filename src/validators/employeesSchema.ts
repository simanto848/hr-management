import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  age: Joi.number().integer().min(18).required().messages({
    'any.required': 'Age is required',
    'number.base': 'Age must be a number',
    'number.min': 'Employee must be at least 18 years old',
  }),
  designation: Joi.string().required().trim().messages({
    'any.required': 'Designation is required',
    'string.empty': 'Designation cannot be empty',
  }),
  hiring_date: Joi.date().iso().required().messages({
    'any.required': 'Hiring date is required',
    'date.base': 'Hiring date must be a valid ISO date (YYYY-MM-DD)',
  }),
  date_of_birth: Joi.date().iso().required().messages({
    'any.required': 'Date of birth is required',
    'date.base': 'Date of birth must be a valid ISO date (YYYY-MM-DD)',
  }),
  salary: Joi.number().positive().required().messages({
    'any.required': 'Salary is required',
    'number.base': 'Salary must be a valid number',
    'number.positive': 'Salary must be greater than zero',
  }),
  photo_path: Joi.string().optional().allow(null, ''),
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().optional().trim(),
  age: Joi.number().integer().min(18).optional(),
  designation: Joi.string().optional().trim(),
  hiring_date: Joi.date().iso().optional(),
  date_of_birth: Joi.date().iso().optional(),
  salary: Joi.number().positive().optional(),
  photo_path: Joi.string().optional().allow(null, ''),
});
