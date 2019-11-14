//
//  DashboardVC.swift
//  ios-client
//
//  Created by Peach, Daniel on 11/12/19.
//  Copyright © 2019 Peach, Daniel. All rights reserved.
//

import UIKit

class DashboardVC: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        
        let suggestions = NewSuggestionsPreview()
        
        let stack = UIStackView(arrangedSubviews: [suggestions])
        
        view.addSubview(stack)
        
        stack.anchor(top: view.safeTopAnchor, leading: view.safeLeadingAnchor, bottom: nil, trailing: view.safeTrailingAnchor)
    }
}
