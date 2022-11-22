import pool from '../config/db/index.js';

// [GET] /api/category
export const get = async (req, res) => {
  try {
    const [category] = await pool.execute(
      'SELECT id, pid, name, useYn FROM category WHERE deleted="N"',
      [],
    );

    // Todo not found
    if (category.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Categories not found' });
    }

    // Return
    return res.json({
      success: true,
      message: 'Get list categories success!',
      category: category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};

// Create - Update - Delete category
// [PUT] /api/category
export const update = async (req, res) => {
  // Set init
  const data = req.body;

  // If data = []
  if (data.length === 0) {
    return res.status(400).json({ success: false, message: 'Update failure!' });
  }

  try {
    Promise.all(
      data.map((category) => {
        if (category.uuid) {
          if (category.deleted !== 'Y') {
            return pool
              .execute(
                `Insert into category (id, pid, name, useYn, deleted) values ('${
                  category.uuid
                }', ${category.pid ? `'${category.pid}'` : null}, '${
                  category.name
                }', 'N', 'N')`,
              )
              .catch((err) => {
                throw new Error(err);
              });
          }
        } else {
          return pool
            .execute(
              `Update category set pid=${
                category.pid ? `'${category.pid}'` : null
              }, name='${category.name}', deleted='${
                category.deleted || 'N'
              }' where id='${category.id}'`,
            )
            .catch((err) => {
              throw new Error(err);
            });
        }
      }),
    )
      .then(() => {
        return res.json({
          success: true,
          message: 'Update categories successfully!',
        });
      })
      .catch((err) => {
        console.log('err', err);
        return res
          .status(400)
          .json({ success: false, message: `Update failure! ${err}` });
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};
