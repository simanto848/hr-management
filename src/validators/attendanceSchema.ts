import Joi from 'joi';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

export const createAttendanceSchema = Joi.object({
  employee_id: Joi.number().integer().positive().required().messages({
    'any.required': 'Employee ID is required',
    'number.base': 'Employee ID must be a number',
  }),
  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid ISO date (YYYY-MM-DD)',
  }),
  check_in_time: Joi.string().regex(timeRegex).required().messages({
    'any.required': 'Check-in time is required',
    'string.pattern.base': 'Check-in time must be in HH:MM:SS format',
  }),
});

export const updateAttendanceSchema = Joi.object({
  check_in_time: Joi.string().regex(timeRegex).required().messages({
    'any.required': 'Check-in time is required',
    'string.pattern.base': 'Check-in time must be in HH:MM:SS format',
  }),
});
