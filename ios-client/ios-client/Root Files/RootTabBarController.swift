//
//  RootTabBarController.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class RootTabBarController: UITabBarController, UITabBarControllerDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        delegate = self
        loadSubVCs()
    }
    
    private func loadSubVCs() {
        let listVC = ListManagerVC()
        listVC.tabBarItem.image = UIImage(named: "list")?.withRenderingMode(.automatic)
        let newVC = NewSuggestionVC()
        newVC.tabBarItem.image = UIImage(named: "new")?.withRenderingMode(.automatic)
        let moreVC = MoreTabVC()
        moreVC.tabBarItem.image = UIImage(named: "profile")?.withRenderingMode(.automatic)
        
        viewControllers = [listVC, newVC, moreVC]
        
        guard let items = tabBar.items else { return }
        
        for item in items {
            item.imageInsets = UIEdgeInsets(top: 16, left: 0, bottom: -16, right: 0)
        }
    }
    
    
}
