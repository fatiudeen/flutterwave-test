import { Router } from 'express';
import middlewares from './middlewares';
import { Request, Response, NextFunction } from 'express';
import { RequsetInterface, ResponseInterface } from './interface';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/',
  [
    body('ID').exists(),
    body('Amount').exists(),
    body('CustomerEmail').exists(),
    body('SplitInfo').exists(),
    body('Currency').exists(),
  ],
  middlewares.validator,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = <RequsetInterface>req.body;
      if (data.SplitInfo.length > 20 || data.SplitInfo.length < 0)
        throw new Error('invald number of split information');
      const result: ResponseInterface = {} as ResponseInterface;
      let Balance: number = data.Amount;
      const totalRatio = data.SplitInfo.reduce((prev, val, idx) => {
        if (val.SplitType === 'RATIO') {
          return (prev += val.SplitValue);
        } else return (prev += 0);
      }, 0);
      let ratioBalance = 0;

      const SplitBreakdown: ResponseInterface['SplitBreakdown'] =
        data.SplitInfo.sort((a, b) => {
          if (a.SplitType < b.SplitType) {
            return -1;
          }
          if (a.SplitType > b.SplitType) {
            return 1;
          }
          return 0;
        }).map((value, index, array) => {
          if (value.SplitType === 'FLAT') {
            Balance = Balance - value.SplitValue;
            return {
              SplitEntityId: value.SplitEntityId,
              Amount: value.SplitValue,
            };
          } else if (value.SplitType === 'PERCENTAGE') {
            const split = (value.SplitValue / 100) * Balance;
            Balance = Balance - split;
            return {
              SplitEntityId: value.SplitEntityId,
              Amount: split,
            };
          } else {
            const split = (value.SplitValue / totalRatio) * Balance;
            ratioBalance += split;

            return {
              SplitEntityId: value.SplitEntityId,
              Amount: split,
            };
          }
        });
      Balance = Balance - ratioBalance;

      if (Balance < 0)
        throw new Error('invalid computation: balance is less than 0');
      result.SplitBreakdown = SplitBreakdown;
      result.Balance = Balance;
      result.ID = data.ID;
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
