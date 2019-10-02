//
//  UIColor+theme.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

extension UIColor {
    static let tLinkBlue = UIColor(red: 17, green: 154, blue: 237)
}

extension UIColor {
    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component \(red)")
        assert(green >= 0 && green <= 255, "Invalid green component \(green)")
        assert(blue >= 0 && blue <= 255, "Invalid blue component \(blue)")
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }
    
    convenience init(withHex hex: String) {
        var trimmedHex: String = hex.trimmingCharacters(in: .whitespaces).uppercased()
        if trimmedHex.hasPrefix("#") { trimmedHex.remove(at: trimmedHex.startIndex) }
        assert(trimmedHex.count == 6, "Hex string must be of length 6")
        var rgbValue: UInt32 = 0
        Scanner(string: trimmedHex).scanHexInt32(&rgbValue)
        self.init(red:(Int(rgbValue & 0xFF0000 >> 16)), green:(Int(rgbValue & 0x00FF00 >> 8)), blue:(Int(rgbValue & 0x0000FF)))
    }
}
