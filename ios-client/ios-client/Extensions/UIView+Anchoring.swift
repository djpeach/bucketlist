//
//  UIView+Anchoring.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

public extension UIView {
    
    // MARK: anchor util functions
    func addSubViews(views: [UIView]) {
        views.forEach( { self.addSubview($0) } )
    }
    
    func anchor(top: NSLayoutYAxisAnchor?, leading: NSLayoutXAxisAnchor?, bottom: NSLayoutYAxisAnchor?, trailing: NSLayoutXAxisAnchor?, padding: UIEdgeInsets = .zero) {
        self.disableAutoresizingMask()
        
        if let top = top {
            self.topAnchor.constraint(equalTo: top, constant: padding.top).activate()
        }
        if let leading = leading {
            self.leadingAnchor.constraint(equalTo: leading, constant: padding.left).activate()
        }
        if let bottom = bottom {
            self.bottomAnchor.constraint(equalTo: bottom, constant: -padding.bottom).activate()
        }
        if let trailing = trailing {
            self.trailingAnchor.constraint(equalTo: trailing, constant: -padding.right).activate()
        }
    }
    
    func centerView() {
        self.disableAutoresizingMask()
        
        if let centerYAnchor = superview?.centerYAnchor {
            self.centerYAnchor.constraint(equalTo: centerYAnchor).activate()
        }
        if let centerXAnchor = superview?.centerXAnchor {
            self.centerXAnchor.constraint(equalTo: centerXAnchor).activate()
        }
    }
    
    func centerViewY() {
        self.disableAutoresizingMask()
        
        if let centerYAnchor = superview?.centerYAnchor {
            self.centerYAnchor.constraint(equalTo: centerYAnchor).activate()
        }
    }
    
    func centerViewX() {
        self.disableAutoresizingMask()
        
        if let centerXAnchor = superview?.centerXAnchor {
            self.centerXAnchor.constraint(equalTo: centerXAnchor).activate()
        }
    }
    
    func setSize(width: Int?, height: Int?) {
        self.disableAutoresizingMask()
        
        if let width = width {
            self.widthAnchor.constraint(equalToConstant: CGFloat(width)).activate()
        }
        if let height = height {
            self.heightAnchor.constraint(equalToConstant: CGFloat(height)).activate()
        }
    }
    
    func setSize(width: CGFloat?, height: CGFloat?) {
        self.disableAutoresizingMask()
        
        if let width = width {
            self.widthAnchor.constraint(equalToConstant: width).activate()
        }
        if let height = height {
            self.heightAnchor.constraint(equalToConstant: height).activate()
        }
    }
    
    func setSize(widthDimension: NSLayoutDimension?, widthMultiplier: CGFloat = 1, heightDimension: NSLayoutDimension?, heightMultiplier: CGFloat = 1) {
        self.disableAutoresizingMask()
        
        if let widthDimension = widthDimension {
            self.widthAnchor.constraint(equalTo: widthDimension, multiplier: widthMultiplier).activate()
        }
        if let heightDimension = heightDimension {
            self.heightAnchor.constraint(equalTo: heightDimension, multiplier: heightMultiplier).activate()
        }
    }
    
    func fillSuperView(padding: UIEdgeInsets = .zero) {
        self.disableAutoresizingMask()
        
        anchor(top: superview?.topAnchor, leading: superview?.leadingAnchor, bottom: superview?.bottomAnchor, trailing: superview?.trailingAnchor, padding: padding)
    }
    
    // MARK: helper functions and vars
    func disableAutoresizingMask() {
        if self.translatesAutoresizingMaskIntoConstraints {
            self.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    var safeTopAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return safeAreaLayoutGuide.topAnchor
        }
        return topAnchor
    }
    
    var safeLeadingAnchor: NSLayoutXAxisAnchor {
        if #available(iOS 11.0, *) {
            return safeAreaLayoutGuide.leadingAnchor
        }
        return leadingAnchor
    }
    
    var safeBottomAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return safeAreaLayoutGuide.bottomAnchor
        }
        return bottomAnchor
    }
    
    var safeTrailingAnchor: NSLayoutXAxisAnchor {
        if #available(iOS 11.0, *) {
            return safeAreaLayoutGuide.trailingAnchor
        }
        return trailingAnchor
    }
}

// MARK: helper constraint functions
extension NSLayoutConstraint {
    func activate() {
        self.isActive = true
    }
}

