'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface Feature {
  icon: IconType
  title: string
  description: string
  color: string
  highlight: string
}

interface Stat {
  number: string
  label: string
  icon: IconType
  description: string
}

interface FeaturesSectionProps {
  features: readonly Feature[]
  stats: readonly Stat[]
}

export default function FeaturesSection({ features, stats }: FeaturesSectionProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn Deutsche Ecke?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi mang đến phương pháp học tiếng Đức hiệu quả với đội ngũ giáo viên chuyên nghiệp
            và công nghệ hiện đại.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}-100 flex items-center justify-center group-hover:bg-${feature.color}-200 transition-colors`}>
                <feature.icon className={`text-2xl text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {feature.description}
              </p>
              <span className={`inline-block px-3 py-1 bg-${feature.color}-100 text-${feature.color}-700 text-sm font-medium rounded-full`}>
                {feature.highlight}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <stat.icon className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium mb-1 text-sm md:text-base">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 