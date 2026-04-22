const router = require("express").Router()

const ProductModel = require("../../Model/AdminModels/ProductModel")
const CheckoutModel = require("../../Model/UserModels/CheckoutModel")
const AuthModel = require("../../Model/AuthModel")

// GET dashboard data
router.get("/dashboard", async (req, res) => {
  try {

    // total revenue
    const revenue = await CheckoutModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$Total" }
        }
      }
    ])

    // total customers
    const customers = await AuthModel.countDocuments({
      UserRole: "user"
    })

    // total products
    const products = await ProductModel.countDocuments()

    // pending orders
    const pendingOrders = await CheckoutModel.countDocuments({
      Status: "pending"
    })

    // recent checkouts
    const recentOrders = await CheckoutModel.find()
      .sort({ createdAt: -1 })
      .limit(5)

    // users waiting for verification
    const pendingUsers = await AuthModel.find({
      isVerified: "pending"
    }).limit(5)
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)


    // users registered today
    const totalTodayUsers = await AuthModel.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })

    // users verified today
    const verifiedTodayUsers = await AuthModel.countDocuments({
      isVerified: "verified",
      updatedAt: {
        $gte: today,
        $lt: tomorrow
      }
    })


    // percentage
    let verifiedPercentage = 0

    if (totalTodayUsers > 0) {
      verifiedPercentage =
        Math.round((verifiedTodayUsers / totalTodayUsers) * 100)
    }

    res.json({
      stats: {
        revenue: revenue[0]?.total || 0,
        customers,
        products,
        pendingOrders
      },
      verifiedToday: verifiedPercentage,
      recentOrders,
      pendingUsers
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router